package QVD::HTTPD;

use warnings;
use strict;

our $VERSION = '0.01';

use URI::Split qw(uri_split);
use QVD::Log;
use QVD::HTTP::StatusCodes qw(:all);
use Socket qw(IPPROTO_TCP TCP_NODELAY);

use parent qw(Net::Server::Fork);

sub default_values { return { no_client_stdout => 1 } }

sub options {
    my ($self, $template) = @_;
    my $prop = $self->{server};
    $self->SUPER::options($template);
    $prop->{SSL} ||= undef;
    $template->{SSL} = \$prop->{SSL};
    $prop->{SSL_key_file} //= undef;
    $template->{SSL_key_file} = \$prop->{SSL_key_file};
    $prop->{SSL_cert_file} //= undef;
    $template->{SSL_cert_file} = \$prop->{SSL_cert_file};
    $prop->{SSL_crl_file} //= undef;
    $template->{SSL_crl_file} = \$prop->{SSL_crl_file};
    $prop->{SSL_verify_mode} //= undef;
    $template->{SSL_verify_mode} = \$prop->{SSL_verify_mode};
}

# token          = 1*<any CHAR except CTLs or separators>
# separators     = "(" | ")" | "<" | ">" | "@"
#                | "," | ";" | ":" | "\" | <">
#                | "/" | "[" | "]" | "?" | "="
#                | "{" | "}" | SP | HT
my $token_re = qr/[!#\$%&'*+\-\.0-9a-zA-Z]+/;

sub post_accept_hook {
	my $self = shift;
	$SIG{__WARN__} = sub { WARN shift; };
	$SIG{__DIE__}  = sub { ERROR shift; };
}

sub process_request {
    my $self = shift;
    my $server = $self->{server};
    my $socket = $server->{client};

    setsockopt $socket, IPPROTO_TCP, TCP_NODELAY, 1;

    if ($server->{SSL}) {
	require IO::Socket::SSL;
        my @extra;
        if ($server->{SSL_verify_mode}) {
            push @extra, SSL_verify_mode => $server->{SSL_verify_mode};
            push @extra, SSL_ca_file => $server->{SSL_ca_file};
            push @extra, SSL_check_crl => 1, SSL_crl_file  => $server->{SSL_crl_file}
                if defined $server->{SSL_crl_file};
        }
	IO::Socket::SSL->start_SSL($socket, SSL_server => 1, NonBlocking => 1,
				   SSL_cert_file => $server->{SSL_cert_file},
				   SSL_key_file  => $server->{SSL_key_file},
                                   @extra);
	$socket->isa('IO::Socket::SSL')
	    or die "SSL negotiation failed: " . IO::Socket::SSL::errstr()
    }

    while (<$socket>) {
	s/\r?\n$//; # HTTP chomp
	next if /^\s*$/;
	DEBUG "processing request $_";
	if (my ($method, $url, $version) = m|^(\w+)\s+(.*?)\s*((?:\bHTTP/\d+\.\d+)?)$|) {
	    if ($version ne 'HTTP/1.1') {
		$self->send_http_error(HTTP_VERSION_NOT_SUPPORTED);
		return;
	    }
	    my @headers;
	    while(<$socket>) {
		s/\r?\n$//; # HTTP chomp
		if (my ($name, $value) = /^($token_re)\s*:\s*(.*?)\s*$/o) {
		    # new header
		    push @headers, "${name}:${value}";
		}
		elsif (/^\s+(.*?)\s+$/) {
		    # header continuation
		    unless (@headers) {
			$self->send_http_error(HTTP_BAD_REQUEST);
			return;
		    }
		    $headers[-1] .= " " . $1;
		}
		elsif (/^$/) {
		    # end of headers
		    $self->_process_http_request($method, $url, \@headers);
		    last;
		}
		else {
		    $self->send_http_error(HTTP_BAD_REQUEST);
		    return;
		}
	    }
	}
	else {
	    $self->send_http_error(HTTP_BAD_REQUEST);
	    return;
	}
    }
}

sub set_http_request_processor {
    my ($self, $callback, $method, $url) = @_;
    my $children_also = $url =~ s|/\*$||;
    my $matcher = quotemeta("$method $url");
    $matcher .= "(?:/.*)?" if $children_also;
    $matcher = qr/^$matcher$/;
    my $p = $self->{_http_request_processor} ||= [];
    @$p = sort { length $_->[1] } @$p, [$callback, $url, $matcher];
    my $c = $self->{_http_request_processor_cache} ||= {};
    delete $$c{$_} for (grep /$matcher/, keys %$c);
    1
}

sub _get_http_request_processor {
    my ($self, $method, $url) = @_;
    my $c = $self->{_http_request_processor_cache} ||= {};
    my $pair = "$method $url";
    $c->{$pair} ||= do {
	my $p = $self->{_http_request_processor} ||= [];
	my $h = (grep $pair =~ $_->[2], @$p)[0]
	    or return undef;
	$h->[0];
    }
}

sub _process_http_request {
    my $self = shift;
    my ($method, $url, $headers) = @_;
    # DEBUG "processing request $method $url";
    my $path = (uri_split $url)[2];
    my $processor = $self->_get_http_request_processor($method, $path);
    if ($processor) {
	eval {
	    $processor->($self, $method, $url, $headers);
	};
	if ($@) {
	    if (ref $@ and $@->isa('QVD::HTTPD::Exception')) {
		$self->send_http_error(@{$@});
	    }
	    else {
		ERROR "unexpected error: $@";
		$self->send_http_error(HTTP_INTERNAL_SERVER_ERROR, $@);
	    }
	}
    }
    else {
	$self->send_http_error(HTTP_NOT_FOUND);
    }
}

sub send_http_response {
    my $self = shift;
    my $code = int shift;
    my @headers;
    for (@_) {
	my @lines = /^(.*)$/g;
	chomp @lines;
	push @headers, join("\r\n  ", @lines);
    }
    my $socket = $self->{server}{client};
    print $socket join("\r\n",
		       "HTTP/1.1 $code ". http_status_message($code),
		       @headers, '', '');
}

sub send_http_response_with_body {
    my $self = shift;
    my $code = shift;
    my $content_type = shift;
    my @headers = (ref $_[0] ? @{shift()} : ());
    my $content = join('', @_);
    $self->send_http_response($code,
			      @headers,
			      "Content-Type: $content_type",
			      "Content-Length: " . length($content));
    my $socket = $self->{server}{client};
    print $socket $content;
}

sub send_http_error {
    my $self = shift;
    my $code = shift // HTTP_INTERNAL_SERVER_ERROR;
    my $headers = (@_ && ref $_[0] ? shift @_ : []);
    $self->send_http_response_with_body($code, 'text/plain',
					$headers,
					(@_ ? @_ : http_status_description($code)))
}

sub json {
    my $self = shift;
    $self->{_json} ||= do {
	require JSON;
	JSON->new->ascii->pretty->allow_nonref;
    }
}

sub throw_http_error {
    shift;
    DEBUG "throwing error " . (ref $_[1] ? "$_[0] [@{$_[1]}] @_[2..$#_]" : "@_");
    die QVD::HTTPD::Exception->new(@_);
}

package QVD::HTTPD::Exception;

sub new {
    my ($class, @args) = @_;
    my $self = \@args;
    bless $self, $class;
}

1;

__END__

=head1 NAME

QVD::HTTPD - The great new QVD::HTTPD!


=head1 SYNOPSIS


    use QVD::HTTPD;
    my $foo = QVD::HTTPD->new();
    ...

=head1 DESCRIPTION

This module based on L<Net::Server> creates an HTTP daemon

=head2 API

=over

=item $httpd->process_request

Internal method that is called by L<Net::Server> for every new TCP
connection stablished to the server.

It handles the basic HTTP protocol parsing and calls
L</_process_http_request> for every HTTP request received over the
socket.

=item $httpd->_process_http_request($method, $url, $headers)

Internal method that performs the dispatching of the HTTP request to
the registered callbacks.


=item $httpd->set_http_request_processor($callback, $method, $url)

registers the given callback C<$callback> to be called when a request
for the given method C<$method> and url C<$url> is received.

The C<$url> parameter can have and asterisk at the end meaning that
the callback will also accept urls pointing to places below the given
path.

=item $httpd->send_http_response($status_code, \@headers)

Sends an HTTP response with the given status code and headers.

This method can not send responses with a body (see
L</send_http_response_with_body>).

=item $httpd->send_http_response_with_body($status_code, $content_type,
                                           \@headers, @body);

Sends an HTTP response with the given status code, header and body.

=item $httpd->send_http_error($code)

Sends the error response associated to the given status code

=item $httpd->json

This is a commodity method that creates, caches an returns an object
of class JSON for encoding/decoding. Probably this functionality
should be moved to a singleton class.

=back


=head1 AUTHORS

Salvador FandiE<ntilde>o (sfandino@yahoo.com)

=head1 COPYRIGHT

Copyright 2009-2010 by Qindel Formacion y Servicios S.L.

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU GPL version 3 as published by the Free
Software Foundation.
