// Downloads and displays weather for today and 6 upcoming days
// Weather provided by Yahoo

var weather = {
	callback: function(data) {
		if(data.query.count == 0) {
			// Hacky solution
			// Weather data sometimes does not load
			// If it does not load, after 1.5s it tries to load again
			setTimeout(function(){
									weatherReload = document.createElement('script');
									weatherReload.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='krakow') and u='c'&format=json&callback=weatherCallback";
									document.head.appendChild(weatherReload);
																				}, 1500);
		}
		else {
			// If weather data is downloaded, it gets displayed on the page
			
			// Data for today
			document.getElementById('weather-today-low-temp').innerHTML = data.query.results.channel.item.forecast[0].low;
			document.getElementById('weather-today-high-temp').innerHTML = data.query.results.channel.item.forecast[0].high;

			document.getElementById('weather-today-img').src = this.codeToImage(data.query.results.channel.item.forecast[0].code);

			// Data for 6 upcoming days
			for(var i=1; i<7; i++) {
				document.getElementById('weather-forecast-temp-'+i).innerHTML = data.query.results.channel.item.forecast[i].high;
				document.getElementById('weather-forecast-image-'+i).src = this.codeToImage(data.query.results.channel.item.forecast[i].code);
			}
		}
	},
	
	// Matches weather code with corresponding image
	codeToImage: function(code) {
		var image = '';
		if (code == 32 || code == 36) image = 'images/weather/sun.png';
		if (code == 34 || code == 30) image = 'images/weather/partly_cloudy.png';
		if ((code >= 13 && code <= 18) || (code == 41 || code == 44)) image = 'images/weather/snow.png';
		if (code >= 25 && code <= 30) image = 'images/weather/cloudy.png';
		if (code == 3 || code == 4 || code == 47 || code == 39) image = 'images/weather/thunderstorm.png';
		if (code == 8 || code == 9) image = 'images/weather/drizzle.png';
		if (code >= 10 && code <= 13) image = 'images/weather/rain.png';
		return image;
	}
}

function weatherCallback(data) {
	weather.callback(data);
}
