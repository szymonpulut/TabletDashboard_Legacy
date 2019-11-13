// Google Calendar data
var calendarClientId = '----';
var calendarDiscoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
var calendarScopes = 'https://www.googleapis.com/auth/calendar.readonly';
var calendarAuthorizeDivId = 'authorize-div';
var calendarAuthorizeButtonId = 'authorize-button';


// MQTT Data
// Adress to WebSockets enabled broker
var mqttAddress = '----';
var mqttId = 'TabletDashboard' + Math.floor(Date.now() / 1000); // Randomize ID to make it unique
// List of topics to subscribe to
var subscribeTopics = new Array('TabletDashboard/Set/Mode/Silent',
		'TabletDashboard/Get/Mode/Silent', 'TabletDashboard/Get/Mode/Night',
		'TabletDashboard/Set/Mode/Night', 'TabletDashboard/Refresh',
		'Szymon/Room/ESP/1/Temperature', 'esp/TreeLight/temperature/temp0',
		'esp/OpenGates/smallgate', 'esp/OpenGates/maingate',
		'esp/GateInfo/MainGate', 'esp/ThermometerHall/temperature');


// ID's of span elements to put the time and date
var idTime = 'clock-time';
var idDate = 'clock-date';

// Lockout length for repeated clicking (in ms) - to prevent accidentaly clicking a button multiple times
var touchLockoutLength = 250;

// Base ID's for calendar events
var calendarEventId = 'calendar-event-';
var calendarTimeId = 'calendar-time-';


// Night mode 
var dayCssFile = 'styles/day.css'; // Default colours for day
var nightCssFile = 'styles/night.css'; // Default colours for night
var nightModeStatusId = 'night-mode-status'; // Night mode status on the swipe-out menu
var nightModeAutomaticOverrideInterval = 10800000; // (in ms) 3 hours - if night mode is changed manually, after no less that time
												// it may be changed automatically
var nightModeBegin = 17; // Hours when night mode begins and ends
var nightModeEnd = 7;


// Silent mode
var defaultSoundFile = 'audio/Deneb.ogg'; // Default sound file for all alerts
var silentModeStatusId = 'silent-mode-status'; // Silent mode status on the swipe-out menu
var silentModeAutomaticOverrideInterval = 10800000; // (in ms) 3 hours - if silent mode is changed manually, after no less that time
												// it may be changed automatically
var silentModeBegin = 22; // Hours when silent mode begins and ends
var silentModeEnd = 6;


// Navigation
var navigationId = 'sidebar';
var contentId = 'content';
var navigationWidth = '15vmax';

// Main gate
var maingateId = 'main-gate'
var holdButtonDelay = 500;
var autocloseDelay = 240000;
var autocloseCountdownId = 'main-gate-autoclose-countdown';
var maingateStatusId = 'main-gate-status';

