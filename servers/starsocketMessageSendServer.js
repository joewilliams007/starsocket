var net = require('net');
let fs = require('fs');


var port = 2225
var server = net.createServer();

var server = net.createServer(function(socket) {

	var ip = socket.remoteAddress
	var dir = "./user_messages/"+ip+"/messages.json";
	var user_folder = dir
	var _messages = "none"

	try {
		_messages = JSON.parse(fs.readFileSync(user_folder));
	} catch (err){}



	var entireMessage = ""
	entireMessage += "Total messages: "+ _messages.length

	
	var lastOfFile = _messages[_messages.length-1]

		socket.write(lastOfFile)

		if (lastOfFile.length>20){
			serverInfo("writing sth over 20 characters") 
		} else {
		serverInfo("writing and the message is "+lastOfFile)
		}


		serverInfo("error sending!!!!!!!!!!!!!!")
		socket.write("error")
	

	
    socket.end();
	serverInfo('A new connection has been established.');

	socket.on('end', function() {
		socket.destroy()
	});

	socket.on('error', function(err) {
		socket.destroy()
	});

});


function serverInfo(info){
	console.log(">_> (sending) " + info)
}

server.listen(port);
serverInfo("Started server on port: " + port)



