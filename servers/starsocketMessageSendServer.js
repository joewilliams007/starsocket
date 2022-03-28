var net = require('net');
let fs = require('fs');


var port = 2225
var server = net.createServer();

var server = net.createServer(function(socket) {
	var _messages = JSON.parse(fs.readFileSync('messages.json')) //.reverse();

	var entireMessage = ""

	// for (i = 0; i < 60; i++){
	// 	entireMessage += _messages[i] + "\n"
	// }

	entireMessage += "Total messages: "+ _messages.length

	var lastOfFile = _messages[_messages.length-1]
	serverInfo("last in file is "+lastOfFile)
	if (lastOfFile.split(" ",2)[0].includes(socket.remoteAddress)){
		serverInfo(" valid ip! "+lastOfFile+" to ip of "+socket.remoteAddress)
		socket.write(lastOfFile.split(" ",2)[1].toString())
		serverInfo("writing "+lastOfFile.split(" ",2)[1].toString())
	} else {
		socket.write("invalid_ip")
		serverInfo("invalid ip")
	}

    // socket.write(entireMessage.replace(/undefined/g,""))
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
	console.log(">_> (sending)" + info)
}

server.listen(port);
serverInfo("Started server on port: " + port)



