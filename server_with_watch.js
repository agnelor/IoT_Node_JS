var http = require("http");
var fs = require("fs");

var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;
console.log("Starting web server");

var server = http.createServer(function(request, response){
	console.log("Received a request: " + request.url);
	
	res.sendFile(__dirname + '/controller.html')
});
server.listen(port, host, function() {
	console.log("Server is listening " + host + ":" + port);
});


fs.watchFile("config.json", function() {
	fs.readFile("config.json", function(error, data) {
		config = JSON.parse(data);
		server.close();
		port = config.port;
		host = config.host;
		server.listen(port, host, function() {
			console.log("Server is now listening " + host + ":" + port);
		});
	});

});
