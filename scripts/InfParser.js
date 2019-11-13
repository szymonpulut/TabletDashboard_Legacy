// Receives, parses and sends information through MQTT

var mqttParse = {
		// Initial function that recognizes message and acts on it
		// e.g. updates temperature and temporarily changes its color
		// or plays sound when gate is opened
		initial: function(topic, message) {
			if(strings.compare(topic, 'esp/TreeLight/temperature/temp0')) {
				var id = 'sensor-outside-temp';
				if(this.update(id, integers.round(message))) this.flash(id);
			}
			else if(strings.compare(topic, 'Szymon/Room/ESP/1/Temperature')) {
				var id = 'sensor-szymon-temp';
				if(this.update(id, integers.round(message))) this.flash(id);
			}
			else if(strings.compare(topic, 'esp/GateInfo/MainGate')) {
				var idUpdate = 'main-gate-status';
				var output = 'error';
				if(strings.compare(message, 'OPEN')) output = 'open';
				else if(strings.compare(message, 'CLOSED')) output = 'closed';
				else if(strings.compare(message, 'PARTIAL')) output = 'partially open';
				else if(strings.compare(message, 'UNKNOWN')) output = 'unknown';
				this.update(idUpdate, output);
				maingate.changeStatus(output);
			}
			else if(strings.compare(topic, 'esp/OpenGates/maingate')) {
				var idFlash = 'main-gate';				
				this.flash(idFlash);
				this.sound();
			}
			else if(strings.compare(topic, 'esp/OpenGates/smallgate')) {
				if(strings.compare(message, 'start opening: 0')) {
					var idFlash = 'small-gate';
					this.flash(idFlash);
					this.sound();
				}
			}
			else if(strings.compare(topic, 'esp/ThermometerHall/temperature')) {
				var id = 'sensor-inside-temp';
				if(this.update(id, integers.round(message))) this.flash(id);
			}
			else if(strings.compare(topic, 'TabletDashboard/Set/Mode/Silent')) {
				var value = '';
				if(strings.compare(message, 'true')) value = 'true';
				else if(strings.compare(message, 'false')) value = 'false';
				else if(strings.compare(message, 'toggle')) value = 'toggle';
				this.config('silent-mode', value);
			}
			else if(strings.compare(topic, 'TabletDashboard/Set/Mode/Night')) {
				var value = '';
				if(strings.compare(message, 'true')) value = 'true';
				else if(strings.compare(message, 'false')) value = 'false';
				else if(strings.compare(message, 'toggle')) value = 'toggle';
				this.config('night-mode', value);
			}
			else if(strings.compare(topic, 'TabletDashboard/Get/Mode/Silent')) {
				sendMqttMessage('TabletDashboard/Info/Mode/Silent', silentMode.value.toString());
			}
			else if(strings.compare(topic, 'TabletDashboard/Get/Mode/Night')) {
				sendMqttMessage('TabletDashboard/Info/Mode/Night', nightMode.value.toString());
			}
			else if(strings.compare(topic, 'TabletDashboard/Refresh')) {
				site.refresh();
			}
		},
		
		// Sets value of id to output, if it has changed returns true, else false
		update: function(id, output) {
			return site.setValues(id, output);
		},
		
		// Configures site options through MQTT
		config: function(option, value) {
			if(strings.compare(option, 'silent-mode')) {
				if(strings.compare(value, 'true')) silentMode.set(true);
				else if(strings.compare(value, 'false')) silentMode.set(false);
				else if(strings.compare(value, 'toggle')) silentMode.toggle();
			}
			else if(strings.compare(option, 'night-mode')) {
				if(strings.compare(value, 'true')) nightMode.set(true);
				else if(strings.compare(value, 'false')) nightMode.set(false);
				else if(strings.compare(value, 'toggle')) nightMode.toggle();
			}
		},
		
		// Temporarily changes color of element to indicate change
		flash: function(id) {
			var element = document.getElementById(id);
			element.classList.add('tColor');
			setTimeout(function(){element.classList.remove('tColor');}, 750)
		},
		
		sound: function() {
			site.playAudio();
		},
		
		send: function(id, information) {
			if(strings.compare(id, 'small-gate')) {
				var topic = 'android/tabletdashboard/smallgate';
				var message = 'open';
				mqttClient.send(topic, message);
			}
			else if(strings.compare(id, 'main-gate')) {
				var topic = 'android/tabletdashboard/maingate';
				var message = 'change';
				mqttClient.send(topic, message);
			}
		}
}
