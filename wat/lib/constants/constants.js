// Debugging purposes

// If true, the internal or fixed roles cannot be edited from WAT
RESTRICT_TEMPLATES = true;

// Debug constants
DEBUG_ACL_FAILS = false;

// noVNC include URI
INCLUDE_URI = "lib/thirds/noVNC/include/";
VNC_MIN_HEIGHT = 400;
VNC_MIN_WIDTH = 600;

// Status codes returned by the API
ALL_STATUS = {
    0000: 'Successful completion',

    1000: 'In progress',
    1100: 'Internal server error',
    1200: 'Action not accomplished for all elements',
    1300: 'Zero items selected, no item has been changed',

    2100: 'No connection to database',
    2210: 'Unable to copy disk image from staging',
    2211: 'Unable to copy whole disk image (lack of space?)',
    2220: 'Unable to find images directory in filesystem',
    2230: 'Unable to find staging directory in filesystem',
    2240: 'Unable to find disk image in staging directory',
    2250: 'Unable to upload disk image',
    2251: 'Unable to move uploaded disk image',
    2260: 'Unable to download disk image',
    2261: 'Unable to move downloaded disk image',

    3100: 'No credentials provided for authentication',
    3200: 'Wrong credentials - Login again',
    3300: 'Session expired - Login again',
    3400: 'Problems to update expiration time in session',
    3500: 'Access to tenant is restricted',

    4100: 'Unavailable action',
    4210: 'Forbidden action for this administrator',
    4220: 'Forbidden filter for this administrator',
    4230: 'Forbidden argument for this administrator',
    4250: 'Forbidden field for this administrator',

    5110: 'Unable to disconnect user in current state',
    5120: 'Unable to stop VM in current state',
    5130: 'Unable to start VM in current state',
    5140: 'Unable to assign host, no host available',

    6100: 'Syntax errors in input json',
    6210: 'Inappropiate filter for this action',
    6220: 'No mandatory filter for this action',
    6230: 'Inappropiate argument for this action',
    6240: 'No mandatory argument for this action',
    6250: 'Inappropiate field for this action',
    6310: 'Invalid value',
    6320: 'Invalid filter value',
    6330: 'Invalid argument value',
    6340: 'Invalid property value',
    6350: 'Invalid tag value',
    6360: 'Invalid acl value',
    6370: 'Invalid role value',
    6410: 'Lack of value for a not nullable field',
    6420: 'No property value provided',
    6430: 'No tag provided',
    6440: 'No acl provided',
    6450: 'No role provided',

    7100: 'Refered related items don\'t exist',
    7110: 'Unable to accomplish, refered related items don\'t exist',
    7120: 'Unable to remove, other items depend on it',
    7200: 'This element already exists',
    7210: 'This property already exists',
    7211: 'This property is already defined as global',
    7220: 'This acl has already been assigned',
    7230: 'This role has already been assigned',
    7310: 'Unable to remove VM - This VM is running',
    7320: 'Unable to remove DI - There are VMs running with it',
    7330: 'Unable to reassign a Tag fixed to another DI',
    7340: 'Fixed, Head and Default Tags cannot be deleted',
    7350: 'Forbidden role assignment: inherited role inherits from inheritor',
    7360: 'Incompatible expiration dates - Soft date must precede the hard one',
    7370: 'Unable to remove a core config item',
    7382: 'Cannot create new configuration tokens'
};

STATUS_SUCCESS = 0;
STATUS_NOT_FOUND = 404;

STATUS_IN_PROGRESS = 1000;
STATUS_INTERNAL_ERROR = 1100;
STATUS_NOT_ALL_DONE = 1200;
STATUS_ZERO_SELECTED = 1300;

STATUS_DB_CONNECTION = 2100;
STATUS_NOT_COPY_STAGING_DI = 2210;
STATUS_NOT_FIND_DI_PATH = 2220;
STATUS_NOT_FIND_STAGING_PATH = 2230;
STATUS_NOT_FIND_STAGING_IMAGE = 2240;
STATUS_UNABLE_TO_DOWNLOAD_DI = 2260;

STATUS_CREDENTIALS_FAIL = 3100;
STATUS_NOT_LOGIN = 3200;
STATUS_SESSION_EXPIRED = 3300;
STATUS_ERROR_UPDATING_EXPIRATION = 3400;
STATUS_TENANT_RESTRICTED = 3500;

STATUS_UNAVAILABLE_ACTION = 4100;
STATUS_FORBIDDEN_ACTION = 4210;
STATUS_FORBIDDEN_FILTER = 4220;
STATUS_FORBIDDEN_ARGUMENT = 4230;
STATUS_FORBIDDEN_FIELD = 4250;

STATUS_UNABLE_DISCONNECT_USER = 5110;
STATUS_UNABLE_STOP_VM = 5120;
STATUS_UNABLE_START_VM = 5130;
STATUS_UNABLE_ASSIGN_HOST = 5140;

STATUS_SYNTAX_ERROR = 6100;
STATUS_INNAPPROPIATE_FLTER = 6210;
STATUS_NO_MANDATORY_FILTER = 6220;
STATUS_INNAPPROPIATE_ARGUMENT = 6230;
STATUS_NO_MANDATORY_ARGUMENT = 6240;
STATUS_INAPPROPIATE_FIELD = 6250;
STATUS_INVALID_VALUE = 6310;
STATUS_INVALID_FILTER = 6320;
STATUS_INVALID_ARGUMENT = 6330;
STATUS_INVALID_PROPERTY = 6340;
STATUS_INVALID_TAG = 6350;
STATUS_INVALID_ACL = 6360;
STATUS_INVALID_ROLE = 6370;
STATUS_NOT_NULLABLE_FIELD = 6410;
STATUS_NO_PROPERTY_PROVIDED = 6420;
STATUS_NO_TAG_PROVIDED = 6430;
STATUS_NO_ACL_PROVIDED = 6440;
STATUS_NO_ROLE_PROVIDED = 6450;

STATUS_ITEMS_DONT_EXIST = 7100;
STATUS_RELATED_ITEMS_DONT_EXIST = 7110;
STATUS_NOT_REMOVED_DUE_DEPENDENCY = 7120;
STATUS_ELEMENT_ALREADY_EXISTS = 7200;
STATUS_PROPERTY_ALREADY_EXISTS = 7210;
STATUS_ACL_ALREADY_ASSIGNED = 7220;
STATUS_ROLE_ALREADY_ASSIGNED = 7230;
STATUS_VM_NOT_DELETED_DUE_RUNNING = 7310;
STATUS_DI_NOT_DELETED_DUE_RUNNING = 7320;
STATUS_TAG_NOT_ASSIGNED_DUE_FIXED = 7330;
STATUS_TAG_NOT_DELETED_DUE_FIXED = 7340;
STATUS_ROLE_NOT_ASSIGNED_DUE_LOOP = 7350;

STATUS_INCOMPATIBLE_EXPIRATION = 7360;
STATUS_UNABLE_REMOVE_CONFIG_TOKEN = 7370;
STATUS_UNABLE_SWITCH_MONOTENANT = 7373;

STATUS_FORBIDDEN = 8;
STATUS_FOREIGN_KEY = 23503;

ERROR_INTERNAL = 500;

// Websockets status
WS_CONNECTING = 0;
WS_OPEN = 1;
WS_CLOSING = 2;
WS_CLOSED = 3;

// App configuration
APP_PATH = './';

// Icons
CLASS_ICON_USERS = 'fa fa-users';
CLASS_ICON_VMS = 'fa fa-cloud';
CLASS_ICON_HOSTS = 'fa fa-hdd-o';
CLASS_ICON_OSFS = 'fa fa-flask';
CLASS_ICON_DIS = 'fa fa-dot-circle-o';
CLASS_ICON_LOGOUT = 'fa fa-power-off';
CLASS_ICON_ADMINS = 'fa fa-suitcase';
CLASS_ICON_ROLES = 'fa fa-graduation-cap';
CLASS_ICON_TEMPLATES = 'fa fa-cube';
CLASS_ICON_TENANTS = 'fa fa-building-o'; 
CLASS_ICON_QVDMANAGE = 'fa fa-sliders'; 
CLASS_ICON_QVDCONFIG = 'fa fa-dashboard'; 
CLASS_ICON_VIEWS = 'fa fa-columns'; 
CLASS_ICON_HELP = 'fa fa-support';
CLASS_ICON_PLATFORM = 'fa fa-bug';
CLASS_ICON_WATMANAGE = 'fa fa-wrench';
CLASS_ICON_WATCONFIG = 'fa fa-dashboard';
CLASS_ICON_LOGOUT = 'fa fa-power-off';
CLASS_ICON_PERSONALAREA = 'fa fa-archive';
CLASS_ICON_USER = 'fa fa-user';
CLASS_ICON_LOG = 'fa fa-file-text-o';
CLASS_ICON_PROPERTIES = 'fa fa-sticky-note-o';
CLASS_ICON_STATUS_RUNNING = 'fa fa-play';
CLASS_ICON_STATUS_STOPPED = 'fa fa-stop';
CLASS_ICON_STATUS_STARTING = 'fa fa-play faa-flash animated';
CLASS_ICON_STATUS_STOPPING = 'fa fa-stop faa-flash animated';
CLASS_ICON_STATUS_ZOMBIE = 'fa fa-medkit';
CLASS_ICON_STATUS_LOST = 'fa fa-map-o faa-flash animated';
CLASS_ICON_BUTTON_SUBROW_OPEN = 'fa-eye'
CLASS_ICON_BUTTON_SUBROW_CLOSE = 'fa-eye-slash'

CLASS_ICON_BY_QVD_OBJ = {
    user: CLASS_ICON_USERS,
    vm: CLASS_ICON_VMS,
    host: CLASS_ICON_HOSTS,
    osf: CLASS_ICON_OSFS,
    di: CLASS_ICON_DIS,
    admin: CLASS_ICON_ADMINS,
    role: CLASS_ICON_ROLES,
    tenant: CLASS_ICON_TENANTS
}

// Classification of Qvd Objects
QVD_OBJS_WITH_PROPERTIES = ['user', 'vm', 'host', 'osf', 'di'];
QVD_OBJS_CLASSIFIED_BY_TENANT = ['user', 'vm', 'osf', 'di', 'administrator', 'log', 'role', 'property'];
QVD_OBJS_CREATABLE = ['user', 'vm', 'host', 'osf', 'di', 'administrator', 'role', 'tenant'];
QVD_OBJS_EDITABLE = ['user', 'vm', 'host', 'osf', 'di', 'administrator', 'role', 'tenant', 'configwat', 'package'];
QVD_OBJS_MASSIVE_EDITABLE = ['user', 'vm', 'host', 'osf', 'di', 'administrator', 'role', 'tenant'];
QVD_OBJS_EXIST_IN_SUPERTENANT = ['role', 'administrator', 'property'];
QVD_OBJS_EXIST_OUT_TENANT = ['role'];
QVD_OBJS_PLATFORM = ['home', 'user', 'vm', 'host', 'osf', 'di'];
QVD_OBJS_SETUP = ['role', 'administrator', 'tenant', 'views', 'watconfig'];
QVD_OBJS_USERAREA = ['profile', 'myviews'];
QVD_OBJS_HELP = ['about', 'documentation'];
QVD_OBJS_QVDCONFIG = ['config'];
QVD_OBJS_EMBEDDED_VIEWS = {
    osf: [
        'di'
    ]
};

// Filters
FILTER_ALL = -10;

// Recover user
RECOVER_USER_ID = 0;
SUPERTENANT_ID = 0;
COMMON_TENANT_ID = -1;

// Default values
DEFAULT_OSF_MEMORY = 256;

// Config
UNCLASSIFIED_CONFIG_CATEGORY = 'unclassified';

// Html pieces
HTML_MODAL_LOADING = '<div class="modal-loading"><i class="fa fa-gear fa-spin"></i></div>';
HTML_MICRO_LOADING = '<div class="micro-loading"><i class="fa fa-gear fa-spin"></i></div>';
HTML_MINI_LOADING = '<div class="mini-loading"><i class="fa fa-gear fa-spin"></i></div>';
HTML_LOADING = '<div class="loading"><i class="fa fa-gear fa-spin"></i></div>';
HTML_MID_LOADING = '<div class="loading-mid"><i class="fa fa-gear fa-spin"></i></div>';
HTML_MID_LOADING_DELETE = '<div class="loading-mid"><i class="fa fa-trash fa-spin"></i></div>';
HTML_ERROR = '<div class="error-loading"><i class="fa fa-warning"></i></div>';
HTML_SORT_ICON = '<i class="fa fa-sort sort-icon"></i>';

// Languages
WAT_LANGUAGES = {
    "en": "English",
    "es": "Spanish"
};
WAT_LANGUAGE_TENANT_OPTIONS = $.extend({
    "auto": "Auto"
}, WAT_LANGUAGES);

WAT_LANGUAGE_ADMIN_OPTIONS = $.extend({
    "default": "Default",
}, WAT_LANGUAGE_TENANT_OPTIONS);


// Block sizes
WAT_BLOCK_SIZES = {
    "5": "5",
    "10": "10",
    "20": "20",
    "50": "50",
    "100": "100"
};
WAT_BLOCK_SIZES_ADMIN = $.extend({
    "0": "Default"
}, WAT_BLOCK_SIZES);


// Documentation
DOC_AVAILABLE_LANGUAGES = ['es', 'en'];
DOC_DEFAULT_LANGUAGE = 'en';

// Number of bytes on a KiloByte
BYTES_ON_KB = 1000;

// Objects that have dependcies with another ones

QVD_OBJ_DEPENDENCIES = {
    user: 'vm',
    osf: 'di'
}

// Log constants

LOG_TYPE_ACTIONS = {
    create: 'Created',
    update: 'Updated',
    create_or_update: 'Setted',
    delete: 'Deleted',
    exec: 'Executed',
    login: 'Logged-in',
    see: 'Visualized'
};

LOG_TYPE_OBJECTS = {
    user: 'User',
    vm: 'Virtual machine',
    host: 'Node',
    osf: 'OS Flavour',
    di: 'Disk image',
    role: 'Role',
    tenant: 'Tenant',
    administrator: 'Administrator',
    admin_view: 'Administrator view',
    tenant_view: 'Default view',
    config: 'Configuration',
    log: 'Log',
};

LOG_TYPE_OBJECTS_ICONS = {
    user: CLASS_ICON_USERS,
    vm: CLASS_ICON_VMS,
    host: CLASS_ICON_HOSTS,
    osf: CLASS_ICON_OSFS,
    di: CLASS_ICON_DIS,
    role: CLASS_ICON_ROLES,
    tenant: CLASS_ICON_TENANTS,
    administrator: CLASS_ICON_ADMINS,
    admin_view: CLASS_ICON_VIEWS,
    tenant_view: CLASS_ICON_VIEWS,
    config: CLASS_ICON_QVDCONFIG,
};

// Antiquity standard options for selects
ANTIQUITY_OPTIONS = [
    {
        'value': FILTER_ALL,
        'text': 'All',
        'selected': true
    },
    {
        'value': 3600,
        'text': '<1 hour'
    },
    {
        'value': 21600,
        'text': '<6 hours'
    },
    {
        'value': 43200,
        'text': '<12 hours'
    },
    {
        'value': 86400,
        'text': '<1 day'
    },
    {
        'value': 604800,
        'text': '<1 week'
    },
    {
        'value': 2592000,
        'text': '<1 month'
    },
    {
        'value': 31536000,
        'text': '<1 year'
    },
];

// Filters that will be fussioned in one filter note
FUSSION_NOTES = {
    object__object_id: {
        label: 'object',
        value: 'object_id',
        qvdObj: 'log',
        replaceValue: 'object_name'
    }
};

// Role templates
ROLE_TEMPLATE_SCOPE = ['Users', 'VMs', 'Nodes', 'OSFs', 'Images', 'Administrators', 'Roles', 'Tenants', /*'Logs',*/ 'Views', 'QVD Config', 'WAT Config', 'QVD', 'WAT'];
ROLE_TEMPLATE_ACTIONS = ['Reader', 'Operator', 'Creator', 'Updater', 'Eraser', 'Manager'];

// Dictionaries
DICTIONARY_STATES = {
    running: 'Running',
    stopped: 'Stopped',
    starting: 'Starting',
    stopping: 'Stopping',
    zombie: 'Zombie',
    lost: 'Lost'
};

// DIG (Disk Image Generator)
OSF_DISTRO_COMMON_ID = -1;

// Key codes
KEYCODE_ENTER = 13;