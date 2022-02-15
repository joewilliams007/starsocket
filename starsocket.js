var net = require('net');
let fs = require('fs')
const _messages = JSON.parse(fs.readFileSync('./messages.json'));
var server = net.createServer();
console.log('Started Server.');

var server = net.createServer(function(socket) {

	console.log('A new connection has been established.');
	socket.pipe(socket);

	socket.write('run');

	socket.on('data', function(chunk) {
		console.log(`Data received from client: ${chunk.toString()}`);
			  //-- Save Message         		
			  _messages.push(chunk.toString().replace(/\n/g, " "))
			  fs.writeFileSync('./messages.json', JSON.stringify(_messages))
	});
	
	socket.on('end', function() {
		console.log('Closing connection with the client');
	});

	socket.on('error', function(err) {
		console.log(`Error: ${err}`);
	});
});


server.listen(2222);


