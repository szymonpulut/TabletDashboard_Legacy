// Various functions

var integers = {
		// Function used to round numbers
		round: function(i, decimals=1) {
			return Math.floor(i*Math.pow(10, decimals))/(Math.pow(10, decimals));
		}
}

var strings = {
		// Comparing strings made easy
		compare: function(stringA, stringB, ignoreCase = true) {
			if(ignoreCase) {
				stringA = stringA.toString().toLowerCase();
				stringB = stringB.toString().toLowerCase();
			}
			if(stringA.toString() == stringB.toString()) return true;
			return false;
		},
		
		// Checks if string contains substring
		contains: function(string, substring) {
			if(string.indexOf(substring) !== -1) return true;
			return false;
		},
		
		// Fills zero when needed: 3 -> 03; 7 -> 07; 13 -> 13
		fillZero: function(i) {
			// TODO: for larger numbers
			if(i<10) i = '0'+i;
			return i;
		}
}

var nightMode = {
	value: false,
	
	dayCssFile: dayCssFile,
	nightCssFile: nightCssFile,
	
	nightModeStatusId: nightModeStatusId,
	
	automaticOverrideInterval: nightModeAutomaticOverrideInterval,
	lastManualOverride: 0,
	
	toggle: function() {
		this.set(!this.value);
	},
	
	// Sets night mode to specific state (false/true), var manual is true when change is initiated by user (most of the times),
	// false when changed due to automatic night mode schedule
	set: function(mode, manual=true) {
		if(manual) this.lastManualOverride = Date.now();
		if(mode == false) {
			this.value = mode;
			site.changeCss(this.dayCssFile, 1);
			this.updateValues(mode);
		}
		else if(mode == true) {
			this.value = mode;
			site.changeCss(this.nightCssFile, 1);
			this.updateValues(mode);
		}
	},
	
	// Sets text values on site
	updateValues: function(mode) {
		if(mode) site.setValues(this.nightModeStatusId, 'ON');
		else site.setValues(this.nightModeStatusId, 'OFF');
	}
}

var silentMode = {
	value: false,
	
	silentModeStatusId: silentModeStatusId,
	
	automaticOverrideInterval: silentModeAutomaticOverrideInterval,
	lastManualOverride: 0,
	
	toggle: function() {
		this.set(!this.value);
	},

	// Sets silent mode to specific state (false/true), var manual is true when change is initiated by user (most of the times),
	// false when changed due to automatic silent mode schedule
	set: function(mode, manual=true) {
		if(manual) this.lastManualOverride = Date.now();
		if(mode == false) {
			this.value = mode;
			this.updateValues(mode);
		}
		else if(mode == true){
			this.value = mode;
			this.updateValues(mode);
		}
	},
	
	// Sets text values on site
	updateValues: function(mode) {
		if(mode) site.setValues(this.silentModeStatusId, 'ON');
		else site.setValues(this.silentModeStatusId, 'OFF');
	}
}

var navigation = {
		navigationId: navigationId,
		contentId: contentId,
		navigationWidth: navigationWidth,
		
		// Opens navigation bar
		open: function() {
		    document.getElementById(this.navigationId).style.width = this.navigationWidth;
		},
		
		// Closes navigation bar
		close: function() {
		    document.getElementById(this.navigationId).style.width = '0';
		}
}

var site = {
		defaultSoundFile: defaultSoundFile,
		touchLockoutLength: touchLockoutLength,
		lastTouchTimestamp: 0,
		
		// Sets value of id to value, if it has changed returns true, else false
		setValues: function(id, value) {
			var change = false;
			if(!strings.compare(document.getElementById(id).innerHTML, value)) {
				document.getElementById(id).innerHTML = value;
				change = true;
			}
			return change;
		},
		
		changeCss: function(cssFile, linkIndex) {
			var oldLink = document.getElementsByTagName('link').item(linkIndex);
			if(!strings.contains(cssFile, oldLink.toString())) document.getElementsByTagName('link').item(linkIndex).href = cssFile;
		},
		
		playAudio: function(path=this.defaultSoundFile) {
			if(!silentMode.value) {
				var audio = new Audio(path);
				audio.play();
			}
		},
		
		changeColor: function(id, color) {
			document.getElementById(id).style.color = color;
		},

		globalTouchLockout: function() {
			var nowTimestamp = new Date().getTime();
			if(nowTimestamp-this.lastTouchTimestamp >= this.touchLockoutLength) {
				this.lastTouchTimestamp = nowTimestamp;
				return true;
			}
			return false;
		},
		
		refresh: function() {
			location.reload();
		}
}

var maingate = {
		mouseHoldTimestamp: 0,
		autocloseCountdown: -1,
		holdButtonDelay: holdButtonDelay,
		autocloseDelay: autocloseDelay,
		autocloseCountdownId: autocloseCountdownId,
		statusId: maingateStatusId,
		status: '',
		
		changeState: function() {
			mqttParse.send('main-gate');
		},
		
		changeStatus: function(status) {
			this.status = status;
		},
		
		mousedown: function() {
			this.mouseHoldTimestamp = new Date().getTime();
		},
		
		mouseup: function() {
			if(site.globalTouchLockout()) {
				var nowTimestamp = new Date().getTime();
				if(this.mouseHoldTimestamp + this.holdButtonDelay <= nowTimestamp && this.autocloseCountdown == -1) {
					this.openAutoclose();
				}
				else {
					this.mouseHoldTimestamp = 0;
					this.autocloseCountdown = -1;
					this.changeState();
				}
			}
		},
		
		openAutoclose: function() {
			this.changeState();
			this.autocloseCountdown = this.autocloseDelay/1000;
			site.setValues(this.autocloseCountdownId, this.autocloseCountdown);
			maingate.showAutocloseCountdown(true);
			this.autocloseUpdate();
		},
		
		autocloseUpdate: function() {
			if(this.autocloseCountdown > 0) {
				this.autocloseCountdown--;
				site.setValues(this.autocloseCountdownId, this.autocloseCountdown);
				setTimeout(function(){ maingate.autocloseUpdate(); }, 1000);
			}
			else if(this.autocloseCountdown == 0) {
				if(!this.checkIfClosed()) {
					this.changeState();
				}
				this.autocloseCountdown--;
				setTimeout(function(){ maingate.autocloseUpdate(); }, 1000);
			}
			else if(this.autocloseCountdown == -1) {
				site.setValues(this.autocloseCountdownId, '');
				maingate.showAutocloseCountdown(false);
			}
		},
		
		checkIfClosed: function() {
			if(!strings.compare(this.status, 'closed')) {
				return false;
			}
			return true;
		},
		
		showAutocloseCountdown: function(value) {
			if(value) {
				document.getElementById(this.autocloseCountdownId).style.width = '50%';
				document.getElementById(this.statusId).style.width = '50%';
			}
			else {
				document.getElementById(this.autocloseCountdownId).style.width = 0;
				document.getElementById(this.statusId).style.width = '100%';
			}
		}
}

var smallgate = {
		open: function() {
			if(site.globalTouchLockout()) {
				mqttParse.send('small-gate');
			}
		}
}
