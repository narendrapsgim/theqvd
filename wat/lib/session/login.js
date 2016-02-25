Wat.L = {
    loggedIn: false,
    sid: '',
    login: '',
    acls: [],
    
    // Process log out including cookies removement
    logOut: function () {
        $.removeCookie('qvdWatSid', { path: '/' });
        $.removeCookie('qvdWatLogin', { path: '/' });
        Wat.C.loggedIn = false;
        Wat.C.sid = '';
        Wat.C.login = '';
        Wat.C.acls = [];
        Wat.I.C.hideCustomizer();
        
        Wat.I.stopServerClock();
    },
    
    // Process login including cookies creation
    // Params:
    //      sid: session ID
    //      login: administrator username
    logIn: function (sid, login) {
        Wat.C.loggedIn = true;
        $.cookie('qvdWatSid', sid, { expires: Wat.C.loginExpirationDays, path: '/' });
        $.cookie('qvdWatLogin', login, { expires: Wat.C.loginExpirationDays, path: '/' });
        
        // Reload screen after login
        var locationHash = window.location.hash;
        
        if (locationHash == '#/login' || locationHash == '#/logout' || typeof WatTests != 'undefined') {
            window.location = '#';
        }
        else {
            window.location.reload();
        }

    },
    
    // Check if current admin is properly logged in
    isLogged: function () {
        if (Wat.C.loggedIn && Wat.C.sid != '' && $.cookie('qvdWatSid') && $.cookie('qvdWatSid') == Wat.C.sid && Wat.C.login != '' && $.cookie('qvdWatLogin') && $.cookie('qvdWatLogin') == Wat.C.login) {
            return true;
        }
        else {
            Wat.L.logOut();
            return false;
        }
    },
    
    // Recover login cookies if exist and call to API to check if credentials are correct
    rememberLogin: function () {
        if ($.cookie('qvdWatSid') && $.cookie('qvdWatLogin')) {
            Wat.C.loggedIn = true;
            Wat.C.sid = $.cookie('qvdWatSid');
            Wat.C.login = $.cookie('qvdWatLogin');
        }
        else {
            Wat.C.loggedIn = false;
            Wat.C.sid = '';
            Wat.C.login = '';
        }
        
        if (Wat.C.sid) {
            Wat.A.performAction('current_admin_setup', {}, VIEWS_COMBINATION, {}, Wat.L.checkLogin, Wat.C);
        }
        else {
            Wat.L.afterLogin ();
        }
    },
    
    // Call to API with user and password retrieved to check if credentials are correct.
    // Params:
    //      user: administrator username
    //      password: administrator password
    // If credentials not retrieved, get it from login form
    tryLogin: function (user, password, tenant) {
        var user = $('input[name="admin_user"]').val() || user;
        var password = $('input[name="admin_password"]').val() || password;
        var tenant = $('input[name="admin_tenant"]').val() || tenant;
        
        if (!user) {
            Wat.I.M.showMessage({message: "Empty user", messageType: "error"});
            return;
        }

        Wat.C.login = user;
        Wat.C.password = password;
        Wat.C.tenant = tenant;
        
        Wat.A.performAction('current_admin_setup', {}, VIEWS_COMBINATION, {}, Wat.L.checkLogin, Wat.C);
    },
    
    // After call to API to get admin setup, check response
    // - Showing message if error. 
    // - Storing useful parameters, perform configuration and rendering main if success.
    // Params:
    //      that: Current context where will be stored API call return
    checkLogin: function (that) {
        that.password = '';
        
        if (that.retrievedData.status == ERROR_INTERNAL) {
            Wat.I.M.showMessage({message: that.retrievedData.statusText, messageType: "error"});
            return;
        }
        else if (that.retrievedData.status == STATUS_SESSION_EXPIRED || that.retrievedData.status == STATUS_CREDENTIALS_FAIL) {
            Wat.L.logOut();
            $.cookie('messageToShow', JSON.stringify({message: that.retrievedData.message, messageType: "error"}), {expires: 1, path: '/'});
            window.location.reload();
            return;
        }
        else if (that.retrievedData.status == STATUS_NOT_LOGIN) {
            Wat.L.logOut();
            Wat.I.M.showMessage({message: that.retrievedData.message, messageType: "error"});
            return;
        }
        else if (!that.retrievedData.acls || $.isEmptyObject(that.retrievedData.acls)) {
            Wat.L.logOut();
            Wat.I.M.showMessage({message: "Wrong credentials", messageType: "error"});
            that.login = '';
            that.sid = '';
            return;
        }
        
        // Store retrieved acls
        Wat.C.acls = that.retrievedData.acls;
        
        // Store language
        Wat.C.language = that.retrievedData.admin_language;
        Wat.C.tenantLanguage = that.retrievedData.tenant_language;
        
        // Store block
        Wat.C.block = that.retrievedData.admin_block;
        Wat.C.tenantBlock = that.retrievedData.tenant_block;
        
        // Store server datetime
        Wat.C.serverDatetime = that.retrievedData.server_datetime;
        
        // Restore possible residous views configuration to default values
        Wat.I.restoreListColumns();
        Wat.I.restoreFormFilters();
        
        // Store views configuration
        Wat.C.storeViewsConfiguration(that.retrievedData.views);
        
        // Store tenant ID and Name
        Wat.C.tenantID = that.retrievedData.tenant_id;
        Wat.C.tenantName = that.retrievedData.tenant_name;
        
        // Store admin ID
        Wat.C.adminID = that.retrievedData.admin_id;   
        
        // Store tenant mode
        Wat.C.multitenant = parseInt(that.retrievedData.multitenant);
        
        // Store time lag between server and client
        var currentDate = new Date();
        var serverDate = new Date(that.retrievedData.server_datetime);
        Wat.C.serverClientTimeLag = parseInt((serverDate - currentDate) / 1000);
        
        // Configure visability
        Wat.C.configureVisibility();
        
        if (Wat.CurrentView.qvdObj == 'login') {
            Wat.L.logIn(that.sid, that.login);
                
            Wat.I.renderMain();

            Wat.Router.watRouter.performRoute('', Wat.Views.HomeView);
        }
                
        Wat.L.afterLogin ();
    },
    
    afterLogin: function () {
        // Load translation file
        Wat.T.initTranslate();

        // Interface onfiguration
        Wat.I.renderMain();
        
        // Hide customizer to show only if is necessary
        Wat.I.C.hideCustomizer();
        
        // If customizer is enabled, show it
        if ((Wat.C.isSuperadmin() || Wat.C.isMultitenant() === 0) && $.cookie('styleCustomizer')) {
            Wat.I.C.initCustomizer();
        }

        if (Wat.C.showServerClock) {
        // Start server clock
        Wat.I.startServerClock();
        }

        // Binding events manually because backbone doesnt allow bind events to dialogs loaded dinamically
        Wat.B.bindCommonEvents();

        if (Wat.L.isLogged()) {
            Wat.I.setCustomizationFields();
        }

        // If the router isnt instantiate, do it
        if (Wat.Router.watRouter == undefined) {          
            // Instantiate the router
            Wat.Router.watRouter = new Wat.Router;
        }
    },
}