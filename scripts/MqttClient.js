var mqttClient = new Paho.MQTT.Client(mqttAddress, mqttId);

function startMqtt() {
	mqttClient.onConnectionLost = onConnectionLost;
	mqttClient.onMessageArrived = onMessageArrived;

	mqttClient.connect({
		onSuccess : onConnect
	});
}

function sendMqttMessage(topic, message) {
	var message = new Paho.MQTT.Message(message);
	message.destinationName = topic;
	mqttClient.send(message);
}

function onConnect() {
	subscribeTopics.forEach(function(entry) {
		mqttClient.subscribe(entry);
	});
}

function onMessageArrived(message) {
	mqttParse.initial(message.destinationName, message.payloadString);
}

function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("Lost connection: " + responseObject.errorMessage);
	}
}

startMqtt();
