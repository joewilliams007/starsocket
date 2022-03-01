var net = require('net');
let fs = require('fs')
const _messages = JSON.parse(fs.readFileSync('./messages.json'));
var server = net.createServer();
console.log('Started Server.');

var server = net.createServer(function(socket) {

	var receivedData
	console.log('A new connection has been established.');

	socket.on('data', function(chunk) {
		console.log(`receiving file...`)
		receivedData += chunk.toString
	});
	
	socket.on('end', function() {
		
		
		var base64Data = receivedData.rawBody.replace(/^data:image\/png;base64,/, "");

		require("fs").writeFile("out.jpg", base64Data, 'base64', function(err) {
		  console.log(err);
		});
		console.log("The file was saved! (1)");


		fs.writeFile("received/newImage.jpg",receivedData,"binary",function (err){
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");
			}
		});

		console.log('Closing connection with the client')
		socket.end()
	});

	socket.on('error', function(err) {
		//console.log(`Error: ${err}`);
		socket.end()
	});
});


server.listen(4754);
