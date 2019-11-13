// Time based functions
// Night and silent mode checks, (on page) clock updates

var time = {
		idTime: idTime,
		idDate: idDate,
		date: new Date(),
		nightModeBegin: nightModeBegin,
		nightModeEnd: nightModeEnd,
		silentModeBegin: silentModeBegin,
		silentModeEnd: silentModeEnd,
		
		// Initial setup when page starts - checks for night and silent mode, creates and updates clock
		initial: function() {
			setInterval(function(){time.updateText();}, 2500);
			time.checkNightMode();
			time.checkSilentMode();
			setInterval(function(){time.checkNightMode(); time.checkSilentMode();}, 900000);
		},
		
		// Updates text on clock
		updateText: function() {
			this.date = new Date();

			var timeText = this.createTimeText();
			var dateText = this.createDateText();
			
			site.setValues(idTime, timeText);
			site.setValues(idDate, dateText);
		},
	
		// Creates text for time on clock
		createTimeText: function() {
			var date = this.date;
			
			var h = strings.fillZero(date.getHours()); var m = strings.fillZero(date.getMinutes()); var s = date.getSeconds();
			var timeText = h + ':' + m;
			return timeText;
		},
		
		// Creates text for date on clock
		createDateText: function() {
			var date = this.date;
			
			var dayOfWeek = date.getDay(); var dayOfMonth = date.getDate();
			var month = date.getMonth(); var year = date.getFullYear();

			var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
					'July', 'August', 'September', 'October', 'November', 'December'];
			
			var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			
			var dateText = dayNames[dayOfWeek] + ', ' + monthNames[month] + ' ' + dayOfMonth;
			
			return dateText;
		},
		
		// Checks for night mode
		// Activates it between hours defined in config AND if it hasn't been overriden in a period specified in config
		checkNightMode: function() {
			if(nightMode.lastManualOverride+nightMode.automaticOverrideInterval < Date.now()) {
				var date = this.date;
				var h = date.getHours();
				if(h >= this.nightModeBegin || h <= this.nightModeEnd) nightMode.set(true, false);
				else nightMode.set(false, false);
				
				nightMode.lastManualOverride = 0;
			}
		},
		
		// Checks for silent mode
		// Activates it between hours defined in config AND if it hasn't been overriden in a period specified in config
		checkSilentMode: function() {
			if(silentMode.lastManualOverride+silentMode.automaticOverrideInterval < Date.now()) {
				var date =  this.date;
				var h = date.getHours();
				
				if(h >= this.silentModeBegin || h <= this.silentModeEnd) silentMode.set(true, false);
				else silentMode.set(false, false);
				
				silentMode.lastManualOverride = 0;
			}
		}
}
