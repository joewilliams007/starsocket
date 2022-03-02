var net = require('net');
let fs = require('fs');

var port = 2223
var server = net.createServer();

var imageData = fs.readFileSync("newImg.jpg");
var server = net.createServer(function(socket) {

    socket.setEncoding("binary")
	serverInfo('A new connection has been established.');

	console.log("finished...")
	socket.end()

	/*
	var imageData = Buffer.from("gjkghlglghkghjkhgjk")

    socket.write(imageData,function(err){
		serverInfo("finished sending file of size: "+imageData.length)
		socket.end()
	})*/


	fs.readFile("newImg.jpg", function(err, imageData){
		if(err){
			serverInfo(err.message)
		}
		socket.write(imageData);
		serverInfo("finished sending file of size: "+imageData.length)
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


