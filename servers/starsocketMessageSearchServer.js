var net = require('net');
let fs = require('fs');


var port = 2229
var server = net.createServer();

var server = net.createServer(function(socket) {
	var _messages = JSON.parse(fs.readFileSync('allusers.json')).reverse();


	var entireMessage = ""

	for (i = 0; i < 60; i++){
		entireMessage += _messages[i] + "\n"
	}

	entireMessage += "Total messages: "+ _messages.length

	serverInfo(entireMessage);
	
    socket.write(entireMessage.replace(/undefined/g,""))
    socket.end();

	serverInfo('A new connection has been established.');
	
	socket.on('end', function() {
		serverInfo('Message sent. Closing connection with the client')
		socket.destroy()
	});

	socket.on('error', function(err) {
		socket.destroy()
	});
});


function serverInfo(info){
	console.log("-> @Message SendSearch Server: " + info)
}

server.listen(port);
serverInfo("Started server on port: " + port)