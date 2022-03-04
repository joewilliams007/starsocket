var net = require('net');
let fs = require('fs');

var port = 2223
var server = net.createServer();

var server = net.createServer(function(socket) {

    socket.setEncoding("binary")
	serverInfo('A new connection has been established.');


	fs.readFile("newImg.jpg", function(err, imageData){
		if(err){
			serverInfo(err.message)
		}
		let imageDataArray = new Uint8Array(imageData.buffer)
		socket.write(imageDataArray);
		serverInfo("finished sending file of size: "+imageDataArray.length)
		socket.end()
	})
    
	
	socket.on('end', function() {
		serverInfo("file send attempt over!")
		socket.destroy()
	});

	socket.on('error', function(err) {
		//serverInfo(`Error: ${err}`);
		socket.destroy()
	});

	socket.end()
});

function serverInfo(info){
	console.log("-> @File Send Server: " + info)
}

server.listen(port);
serverInfo("Started server on port: " + port)


