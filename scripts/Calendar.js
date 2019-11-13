// Downloads calendar data from Google Calendar and displays them

var calendar = {
		add: function(date, name, id) {
			// Creates couple of dates with hours set on midnight (makes for easier date comparison)
			var dateEventMidnight = new Date(date);
			dateEventMidnight.setHours(0,0,0,0);
			
			var dateTodayMidnight = new Date();
			dateTodayMidnight.setHours(0,0,0,0);
			
			var dateTomorrowMidnight = new Date(dateTodayMidnight.getTime()+86400000);
			
			var dateText;
			
			// Special date texts for today and tomorrow
			if(dateEventMidnight.getTime() == dateTodayMidnight.getTime()) {
			    dateText = "Today, "+strings.fillZero(date.getHours())+":"+strings.fillZero(date.getMinutes());
			}
			else if(dateEventMidnight.getTime() == dateTomorrowMidnight.getTime()) {
				dateText = "Tomorrow, "+strings.fillZero(date.getHours())+":"+strings.fillZero(date.getMinutes());
			}
			else {
				var month = new Array();
				month[0] = "January";
				month[1] = "February";
				month[2] = "March";
				month[3] = "April";
				month[4] = "May";
				month[5] = "June";
				month[6] = "July";
				month[7] = "August";
				month[8] = "September";
				month[9] = "October";
				month[10] = "November";
				month[11] = "December";
				
				dateText = strings.fillZero(date.getDate())+" "+month[date.getMonth()]+" "+date.getFullYear()+", "+
						strings.fillZero(date.getHours())+":"+strings.fillZero(date.getMinutes());
			}
			
			site.setValues('calendar-time-'+id, dateText);
			site.setValues('calendar-event-'+id, name);
		},

		// Empties the calendar if no entries are found (so outdated entries disappear)
		empty: function() {
			for(var i=1; i<=5; i++) {
			site.setValues('calendar-time-'+i, '');
			site.setValues('calendar-event-'+i, '');
			}
		}
}
