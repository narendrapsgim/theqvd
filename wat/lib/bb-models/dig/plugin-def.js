Wat.Models.PluginDef = Wat.Models.DIG.extend({
    defaults: {
    },
    
    initialize: function (attrs, opts) {
        opts = opts || {};
        
        if (opts.osdId) {
            this.osdId = opts.osdId;
            this.urlRoot = this.baseUrl() + '/osd/' + opts.osdId + '/plugin';
        }
        else {
            this.urlRoot = this.baseUrl() + '/plugin';
        }

        Backbone.Model.prototype.initialize.apply(this, [attrs]);
    },
    
    parse: function (response) {
        return this.mock();
        //return $.extend({}, response, this.mock(response));
    },
    
    mock: function () {
        var data = {};
        
        switch (this.id) {
            case 'os':
                data = {
                    distro: {
                        description: 'OS distro',
                        control_type: 'list_options',
                        list_options: {
                            1: { 
                                value: 'Ubuntu 16.04',
                                icon: 'https://lh6.ggpht.com/RZeFXe1KB7fk9w6t7C8qM6rX6pyZIT6SrezUkTqTawVOKCw_ZRa2wQa3-9a_lO5gGU7e=w300'
                            },
                            2: { 
                                value: 'SLES 12',
                                icon: 'https://www.iconfinder.com/data/icons/flat-round-system/512/opensuse-128.png'
                            },
                            3: { 
                                value: 'Red Hat',
                                icon: 'https://cdn1.iconfinder.com/data/icons/nuove/128x128/apps/redhat.png'
                            }
                        }
                    },
                }
                break;
            case 'vma':
                data = {
                    vma_allow_sound: {
                        description: 'Allow sound',
                        control_type: 'list_options',
                        list_options: {
                            0: { value: 'No' },
                            1: { value: 'Yes' }
                        }
                    },
                    vma_allow_printing: {
                        description: 'Allow printing',
                        control_type: 'list_options',
                        list_options: {
                            0: { value: 'No' },
                            1: { value: 'Yes' }
                        }
                    },
                    vma_allow_sharing: {
                        description: 'Allow folders and USB sharing',
                        control_type: 'list_options',
                        list_options: {
                            0: { value: 'No' },
                            1: { value: 'Yes' }
                        }
                    }
                }
                break;
            case 'desktop':
                data = {
                    wallpaper: {
                        description: 'Wallpaper',
                        control_type: 'list_images',
                        list_images: {
                            1: {
                                url: 'http://www.planwallpaper.com/static/images/general-night-golden-gate-bridge-hd-wallpapers-golden-gate-bridge-wallpaper.jpg',
                                name: 'Golden gate'
                            },
                            2: {
                                url: 'http://www.planwallpaper.com/static/images/555837.jpg',
                                name: 'Big hero'
                            },
                            3: {
                                url: 'http://www.planwallpaper.com/static/images/wallpapers-7020-7277-hd-wallpapers.jpg',
                                name: 'Cookie monster'
                            },
                            4: {
                                url: 'http://www.planwallpaper.com/static/images/6768666-1080p-wallpapers.jpg',
                                name: 'Ball'
                            }
                        }
                    }
                }
                break;
            case 'execution_hooks':
                data = {
                    script: {
                        description: 'Scripts',
                        control_type: 'list_files',
                        list_files: {
                            10: {
                                name: 'configure_anything.sh'
                            },
                            11: {
                                name: 'log_connection.sh'
                            },
                            12: {
                                name: 'close_connection.sh'
                            },
                        },
                        settings: {
                            hook: {
                                description: 'When be executed',
                                control_type: 'list_options',
                                list_options: {
                                    'first_connection': 'Only first session starting',
                                    'vma.on_state.connected': 'In any session starting',
                                    'vma.on_state.expire': 'On expiration'
                                },
                            }
                        }
                    }
                }
                break;
            case 'shortcuts':
                data = {
                    shortcut: {
                        description: 'Shortcuts',
                        control_type: 'controls_group',
                        controls_group: {
                            name: {
                                description: 'Shortcut name',
                                control_type: 'text',
                                default_value: ''
                            },
                            command: {
                                description: 'Command',
                                control_type: 'text',
                                default_value: ''
                            },
                            icon: {
                                description: 'Icon',
                                default_value: 1,
                                control_type: 'list_images',
                                list_images: {
                                    1: {
                                        url: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-11/256/Application-icon.png',
                                        name: 'Generic application'
                                    },
                                    2: {
                                        url: 'https://lh6.ggpht.com/RZeFXe1KB7fk9w6t7C8qM6rX6pyZIT6SrezUkTqTawVOKCw_ZRa2wQa3-9a_lO5gGU7e=w300',
                                        name: 'Ubuntu'
                                    },
                                    3: {
                                        url: 'https://www.iconfinder.com/data/icons/flat-round-system/512/opensuse-128.png',
                                        name: 'SLES'
                                    },
                                    4: {
                                        url: 'https://cdn1.iconfinder.com/data/icons/nuove/128x128/apps/redhat.png',
                                        name: 'Red Hat'
                                    },
                                    5: {
                                        url: 'https://www.mozilla.org/media/img/styleguide/identity/firefox/guidelines-logo.7ea045a4e288.png',
                                        name: 'Firefox'
                                    }
                                }
                            },
                        }
                    }
                }
                break;
            case 'example_blocked':
                data = {
                    blocked: true,
                    blocked_by: ['os']
                }
                break;
        }
        
        return data;
    }
});