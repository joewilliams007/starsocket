var net = require('net');
let fs = require('fs');


var port = 2228
var server = net.createServer();

var server = net.createServer(function(socket) {
	var _messages = JSON.parse(fs.readFileSync('status.json')).reverse();

	var entireMessage = ""

	//for (i = 0; i < 60; i++){
	//
	//}
	var entireMessage = _messages[0]

	entireMessage += "Total messages: "+ _messages.length

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
	console.log("-> @Message Send Server: " + info)
}

server.listen(port);
serverInfo("Started server on port: " + port)