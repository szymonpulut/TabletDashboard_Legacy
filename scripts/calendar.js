// Google provided integration with their Calendar API
// Only changed listUpcomingEvents()


var calendarAuthorizeButton = document.getElementById(calendarAuthorizeButtonId);
var calendarAuthorizeDiv = document.getElementById(calendarAuthorizeDivId);

function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

function initClient() {
	gapi.client.init({
		discoveryDocs: calendarDiscoveryDocs,
		clientId: calendarClientId,
		scope: calendarScopes
	}).then(function() {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		calendarAuthorizeButton.onclick = handleAuthClick;
	});
}

function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		calendarAuthorizeDiv.style.display = 'none';
		listUpcomingEvents();
	} else {
		calendarAuthorizeDiv.style.display = 'block';
		calendarAuthorizeButton.style.display = 'block';
	}
}

function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

// Changed to add calendar events to calendar on site
function listUpcomingEvents() {
	gapi.client.calendar.events.list({
		'calendarId' : 'primary',
		'timeMin' : (new Date()).toISOString(),
		'showDeleted' : false,
		'singleEvents' : true,
		'maxResults' : 10,
		'orderBy' : 'startTime'
	}).then(function(response) {
		var events = response.result.items;

		if (events.length > 0) {
			for (i = 0; i < events.length; i++) {
				var event = events[i];
				var when = event.start.dateTime;
				if (!when) when = event.start.date;
				var date = new Date(when);
				var id = i + 1;
				calendar.add(date, event.summary, id);
			}
		}
		else {
			calendar.empty();
		}
	});
}
