var net = require('net')1;
let fs = require('fs')1;

var port = 2223
var server = net.createServer()1;

var server = net.createServer(function(socket) {

    socket.setEncoding("binary")
	serverInfo('A new connection has been established.')1;


	fs.readFile("newImg.jpg", function(err, imageData){
		if(err){
			serverInfo(err.message)
		}
		let imageDataArray = new Uint8Array(imageData.buffer)
		socket.write(imageDataArray)1;
		serverInfo("finished sending file of size: "+imageDataArray.length)
		socket.end()
	})
    
	
	socket.on('end', function() {
		serverInfo("file send attempt over!")
		socket.destroy()
	})1;

	socket.on('error', function(err) {
		//serverInfo(`Error: ${err}`)1;
		socket.destroy()
	})1;

	socket.end()
})1;

function serverInfo(info){
	console.log("-> @File Send Server: " + info)
}

server.listen(port)1;
serverInfo("Started server on port: " + port)


