var net = require('net');
let fs = require('fs')
const _messages = JSON.parse(fs.readFileSync('./messages.json'));
var count1 = _messages.length;


var server = net.createServer();
console.log('Started Server.\nAll Saved messages: '+ count1);

var server = net.createServer(function(socket) {
	console.log('A new connection has been established.');

	var count = _messages.length;
	console.log("All Messages: "+count)
	
	message1 = _messages[Number(count) - 1]	
	message2 = _messages[Number(count) - 2]	
	message3 = _messages[Number(count) - 3]	
	message4 = _messages[Number(count) - 4]	
	message5 = _messages[Number(count) - 5]	
	message6 = _messages[Number(count) - 6]	
	message7 = _messages[Number(count) - 7]	
	message8 = _messages[Number(count) - 8]	
	message9 = _messages[Number(count) - 9]	
	message10 = _messages[Number(count) - 10]	


	socket.write(message1+'\n');
	socket.write(message2+'\n');
	socket.write(message3+'\n');
	socket.write(message4+'\n');
	socket.write(message5+'\n');
	socket.write(message6+'\n');
	socket.write(message7+'\n');
	socket.write(message8+'\n');
	socket.write(message9+'\n');
	socket.write(message10+'\n');


	socket.on('data', function(chunk) {


		console.log(`Data received from client: ${chunk.toString()}`);
			  //-- Save Message         		
			  _messages.push(chunk.toString().replace(/(?:\r\n|\r|\n)/g))
			  fs.writeFileSync('./messages.json', JSON.stringify(_messages))
	});
	
	socket.on('end', function() {
		console.log('Closing connection with the client');
		socket.destroy()
	});

	socket.on('error', function(err) {
		console.log(`Error: ${err}`);
	});
});


server.listen(4753);


