var fs = require("fs");
var mqtt = require('mqtt')
var express = require("express");


console.log("Starting");
var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

var mqtt_server="mqtt://ec2-35-165-53-51.us-west-2.compute.amazonaws.com:1883";

var client = mqtt.connect(mqtt_server)
var app = express();

app.use(express.static("./"));

app.get('/', function (request, response) {
	
    // Note: __dirname is directory that contains the JavaScript source code. 
	res.sendFile(__dirname + '/controller.html')
})

app.get("/light/:text", function(request,response) {
	
	
	
	
	client.publish('iot', 'Home/Hall/Light/' + request.params.text)	
	
	response.end();
	
});

app.get("/fan/:text", function(request,response) {
	
	
	client.publish('iot', 'Home/Hall/Fan/' + request.params.text)	
	
	response.end();
	
});

app.get("/alarm/:text", function(request,response) {
	
	
	client.publish('iot', 'Home/Hall/Alarm/' + request.params.text)	
	
	response.end();
	
});

app.listen(port,host);

fs.watchFile("config.json", function() {
	fs.readFile("config.json", function(error, data) {
		config = JSON.parse(data);
		app.close();
		port = config.port;
		host = config.host;
		app.listen(port, host, function() {
			console.log("Server is now listening " + host + ":" + port);
		});
	});

});
