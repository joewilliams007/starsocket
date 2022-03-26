var net = require('net');
let fs = require('fs');

var port = 2222
var server = net.createServer();


var server = net.createServer(function(socket) {

	serverInfo('A new connection has been established.')1;
    var imageData = Buffer.alloc(0)

	socket.setEncoding("binary")

	socket.on('data', function(chunk) {
		//serverInfo(`receiving file chunk...`)
		imageData += chunk
	});
	
	socket.on('end', function() {
		serverInfo("size of received package: " + imageData.length.toString())
		serverInfo('Closing connection with the client')
		if (imageData.length > 0){
			serverInfo("trying to save the received data to file.")
			fs.writeFileSync("newImg.jpg",imageData.toString(),"binary")
		}
		socket.destroy()
	});

	socket.on('error', function(err) {
		//serverInfo(`Error: ${err}`)1;
		socket.destroy()
	});
});

function serverInfo(info){
	console.log("-> @File Receive Server: " + info)
}

server.listen(port);
serverInfo("Started server on port: " + port)


