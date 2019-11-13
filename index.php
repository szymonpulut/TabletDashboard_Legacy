<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<meta http-equiv="refresh" content="10800">

<title>Tablet Dashboard</title>

<link href="styles/styles.css" rel="stylesheet">
<link href="styles/day.css" rel="stylesheet">

<link rel="icon" href="images/favicon.ico" type="image/x-icon"/>

<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="scripts/Config.js"></script>

<script src="scripts/MqttClient.js" type="text/javascript"></script>
<script src="scripts/InfParser.js" type="text/javascript"></script>
<script src="scripts/Weather.js" type="text/javascript"></script>
<script src="scripts/Time.js" type="text/javascript"></script>
<script type="text/javascript" src="scripts/jquery.touchSwipe.min.js"></script>
<script src="scripts/Functions.js" type="text/javascript"></script>

</head>
<body>
<div id="content">
	<div id="sidebar" class="sidebar">
		<div onClick="nightMode.toggle();">
			<span>Night Mode: </span><span id="night-mode-status">OFF</span>
		</div>
		<div onClick="silentMode.toggle();">
			<span>Silent Mode: </span><span id="silent-mode-status">OFF</span>
		</div>
		<div onClick="navigation.close();">
			<span>Close</span>
		</div>
	</div>
	<div id="clock">
		<div class="text-vertical-center;">
			<span id="clock-time"></span><br />
			<span id="clock-date"></span>
		</div>
	</div>
	<div id="weather-today">
		<div class="text-vertical-center;">
			<div id="weather-today-image"><br />
				<img id="weather-today-img" />
			</div>
			<div id="weather-today-text">
				<div id="weather-today-low">
					<span id="weather-today-low-temp" class="weather-today-temp"></span><span class="weather-today-temp">&#176;C</span><br />
					<span id="weather-today-low-text">LOW</span>
				</div>
				<div id="weather-today-high">
					<span id="weather-today-high-temp" class="weather-today-temp"></span><span class="weather-today-temp">&#176;C</span><br />
					<span id="weather-today-high-text">HIGH</span>
				</div>
			</div>
		</div>
	</div>
	<div id="weather-forecast">
		<div id="weather-forecast-day-1" class="weather-forecast-day">
			<div class="text-vertical-center">
				<img id="weather-forecast-image-1" /><br />
				<span class="weather-forecast-caption" id="weather-forecast-temp-1"></span><span class="weather-forecast-caption">&#176;C</span>
			</div>
		</div>
		<div id="weather-forecast-day-2" class="weather-forecast-day">
			<div class="text-vertical-center">
				<img id="weather-forecast-image-2" /><br />
				<span class="weather-forecast-caption" id="weather-forecast-temp-2"></span><span class="weather-forecast-caption">&#176;C</span>
			</div>
		</div>
		<div id="weather-forecast-day-3" class="weather-forecast-day">
			<div class="text-vertical-center">
				<img id="weather-forecast-image-3" /><br />
				<span class="weather-forecast-caption" id="weather-forecast-temp-3"></span><span class="weather-forecast-caption">&#176;C</span>
			</div>
		</div>
		<div id="weather-forecast-day-4" class="weather-forecast-day">
			<div class="text-vertical-center">
				<img id="weather-forecast-image-4" /><br />
				<span class="weather-forecast-caption" id="weather-forecast-temp-4"></span><span class="weather-forecast-caption">&#176;C</span>
			</div>
		</div>
		<div id="weather-forecast-day-5" class="weather-forecast-day">
			<div class="text-vertical-center">
				<img id="weather-forecast-image-5" /><br />
				<span class="weather-forecast-caption" id="weather-forecast-temp-5"></span><span class="weather-forecast-caption">&#176;C</span>
			</div>
		</div>
		<div id="weather-forecast-day-6" class="weather-forecast-day">
			<div class="text-vertical-center">
				<img id="weather-forecast-image-6" /><br />
				<span class="weather-forecast-caption" id="weather-forecast-temp-6"></span><span class="weather-forecast-caption">&#176;C</span>
			</div>
		</div>
	</div>
	<div id="small-gate" onclick="smallgate.open();">
		<div class="text-vertical-center;">
			<div id="small-gate-button">Small Gate</div>
		</div>
	</div>
	<div id="main-gate">
		<div class="text-vertical-center;">
			<div id="main-gate-button">Main Gate</div>
			<div id="main-gate-status"></div><div id="main-gate-autoclose-countdown"></div>
		</div>
	</div>
	<div id="heater-control">
		<div id="heater-control-minus"><div class="text-vertical-center;">-</div></div>
		<div id="heater-control-info"><div class="text-vertical-center;">Status: <span id="heater-control-status">OFF</span><br />Current: <span id="heater-control-currenttemp">21</span>&#176;C<br />Target: <span id="heater-control-targettemp">22</span>&#176;C</div></div>
		<div id="heater-control-plus"><div class="text-vertical-center;">+</div></div>
	</div>
	<div id="sensor-list">
		<div class="text-vertical-center">
			<div id="sensor-list-1" class="sensor-list-sensor">Outside: <span id="sensor-outside-temp">--</span>&#176;C</div>
			<div id="sensor-list-2" class="sensor-list-sensor">Inside: <span id="sensor-inside-temp">--</span>&#176;C</div>
			<div id="sensor-list-3" class="sensor-list-sensor">Szymon: <span id="sensor-szymon-temp">--</span>&#176;C</div>
			<div id="sensor-list-4" class="sensor-list-sensor">Garage: <span id="sensor-garage-temp">--</span>&#176;C</div>
			<div id="sensor-list-5" class="sensor-list-sensor">Fireplace: <span id="sensor-fireplace-temp">--</span>&#176;C</div>
		</div>
	</div>
	<div id="calendar">
		<div id="authorize-div" style="display: none;">
      			<span>Please authorize access to Google Calendar data</span>
      			<!--Button for the user to click to initiate auth sequence -->
			<button id="authorize-button" onclick="handleAuthClick(event)">Authorize</button>
   		</div>
		<div id="calendar-1" class="calendar-list-event">
			<span id="calendar-time-1" class="calendar-time"></span><br />
			<span id="calendar-event-1" class="calendar-event"><span>
		</div>
		<div id="calendar-2" class="calendar-list-event">
			<span id="calendar-time-2" class="calendar-time"></span><br />
			<span id="calendar-event-2" class="calendar-event"><span>
		</div>
		<div id="calendar-3" class="calendar-list-event">
			<span id="calendar-time-3" class="calendar-time"></span><br />
			<span id="calendar-event-3" class="calendar-event"><span>
		</div>
		<div id="calendar-4" class="calendar-list-event">
			<span id="calendar-time-4" class="calendar-time"></span><br />
			<span id="calendar-event-4" class="calendar-event"><span>
		</div>
		<div id="calendar-5" class="calendar-list-event">
			<span id="calendar-time-5" class="calendar-time"></span><br />
			<span id="calendar-event-5" class="calendar-event"><span>
		</div>
	</div>
</div>
<script src="https://apis.google.com/js/api.js"></script>
<script src="scripts/Calendar.js" type="text/javascript"></script>
<script src="scripts/calendar.js" type="text/javascript"></script>

<script id='code_1'>

</script>
<script src="scripts/main.js" type="text/javascript"></script>
<script src="https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='krakow') and u='c'&format=json&callback=weatherCallback"></script>
<script id='code_2'>setTimeout(2500, handleClientLoad());</script>
</body>
</html>
