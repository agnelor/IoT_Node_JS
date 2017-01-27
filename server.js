var fs = require("fs");
var mqtt = require('mqtt')
var express = require("express");
//var bodyParser  = require('body-parser');
//var morgan      = require('morgan');


var config = JSON.parse(fs.readFileSync("config.json"));

var host = config.host;
var port = config.port;
var mqtt_server=config.mqtt_server;

var client = mqtt.connect(mqtt_server)
var app = express();


// use body parser so we can get info from POST and/or URL parameters
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use(express.static("./app"));

// use morgan to log requests to the console
//app.use(morgan('dev'));


app.get('/', function (request, response) {
	
    // Note: __dirname is directory that contains the JavaScript source code. 
	response.sendFile(__dirname + '/app/controller.html')
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

app.listen(port,host,function() {
	console.log("Server is now listening " + host + ":" + port);
});

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