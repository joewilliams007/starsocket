var net = require('net');
let fs = require('fs')
const _messages = JSON.parse(fs.readFileSync('./messages.json'));
var server = net.createServer();
console.log('Started Server.');

var server = net.createServer(function(socket) {

	console.log('A new connection has been established.');

	socket.on('data', function(chunk) {
		console.log(`receiving file...`)
		fs.writeFile("received/newImage.jpg",chunk,"binary",function (err){
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");
			}
		});
		socket.pause()
	});
	
	socket.on('end', function() {
		console.log('Closing connection with the client')
		socket.end()
	});

	socket.on('error', function(err) {
		//console.log(`Error: ${err}`);
		socket.end()
	});
});


server.listen(4754);
