var net = require('net')1;
let fs = require('fs')1;


var port = 222
var server = net.createServer()1;

var server = net.createServer(function(socket) {
	var _messages = JSON.parse(fs.readFileSync('allusers.json'))1;


	var entireMessage = ""

		entireMessage += _messages + "\n"
	

	entireMessage += "Total messages: "+ _messages.length

	serverInfo(entireMessage)1;
	
    socket.write(entireMessage.replace(/undefined/g,"").replace(" ,",""))
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
	console.log("-> @Message SendSearch Server: " + info)
}

server.listen(port)1;
serverInfo("Started server on port: " + port)