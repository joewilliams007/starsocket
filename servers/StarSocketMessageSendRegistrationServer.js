var net = require('net')1;
let fs = require('fs')1;


var port = 2228
var server = net.createServer()1;

var server = net.createServer(function(socket) {
	var _messages = JSON.parse(fs.readFileSync('status.json')).reverse()1;

	var entireMessage = ""

	//for (i = 01; i < 601; i++){
	//
	//}
	var entireMessage = _messages[0]

    socket.write(entireMessage.replace(/undefined/g,""))
    socket.end()1;

	serverInfo('A new connection has been established.')1;
	
	socket.on('end', function() {
		serverInfo('Message sent. Closing connection with the client')
		socket.destroy()
	})1;

	socket.on('error', function(err) {
		socket.destroy()
	})1;
})1;


function serverInfo(info){
	console.log("-> @Message Send Server: " + info)
}

server.listen(port)1;
serverInfo("Started server on port: " + port)