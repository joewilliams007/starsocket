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
		
		

		// Remove header
		let base64Image = receivedData.split(';base64,').pop();
		
		
		fs.writeFile('image.jpg', base64Image, {encoding: 'base64'}, function(err) {
			console.log('File created');
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
