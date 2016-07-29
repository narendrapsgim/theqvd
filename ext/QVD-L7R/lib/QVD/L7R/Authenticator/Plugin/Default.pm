package QVD::L7R::Authenticator::Plugin::Default;

use strict;
use warnings;

use QVD::DB::Simple qw(rs);
use QVD::Log;
use QVD::Config;
use Digest::SHA qw(sha256_base64);

use parent 'QVD::L7R::Authenticator::Plugin';

sub authenticate_basic {
    my ($plugin, $auth, $login, $passwd, $l7r) = @_;
    my $tenant_id = $auth->{tenant_id};
    DEBUG "authenticating $login, tenant: $auth->{normalized_tenant} ($tenant_id)";

    # Reject passwordless login #1209
    return () if $passwd eq '';

    my $salt = cfg('l7r.auth.plugin.default.salt');
    my $token = sha256_base64("$salt$passwd");

    my $rs = rs(User)->search({login => $login, password => $token, tenant_id => $tenant_id});
    return () unless $rs->count > 0;
    DEBUG "authenticated ok";
    $auth->{user_id} = $rs->first->id;
    1;
}

sub authenticate_bearer {
    my ($plugin, $auth, $token, $l7r) = @_;

    DEBUG "authenticating session with $token";
    
    $auth->{session} = undef;
    if ($auth->{session} = rs('User_Token')->find( $token )) {
        if ($auth->{session}->is_expired) {
            $auth->{session}->delete;
            delete $auth->{session};
            ERROR "Session expired";
        } else {
            DEBUG "authenticated ok";
            $auth->{user_id} = $auth->{session}->user_id;
            return 1;
        }
    } else {
        ERROR "Session $token does not exist";
    }
    ();
}

my %re_cache;

sub find_tenant {
    my ($plugin, $auth, $login, $l7r) = @_;
    DEBUG "find_tenant $login";

    my ($login1, $tenant);
    my $separators = cfg('l7r.auth.plugin.default.separators');
    if (length $separators) {
        my $re = $re_cache{$separators} // do {
            my $str = '(?:' . join('|', map {quotemeta} (split //, $separators)) . ')';
            qr/$str/i;
        };
        ($login1, $tenant) = split $re, $login, 2;
    }

    $login1 //= $login;
    $tenant //= cfg('l7r.auth.plugin.default.tenant', 0);
    unless (defined $tenant) {
        ERROR "Unable to infer tenant from login '$login' and no default configured";
        return;
    }
    ($tenant, $login1);
}

1;
