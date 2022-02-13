var net = require('net');
const _messages = JSON.parse(fs.readFileSync('./messages.json'));

var server = net.createServer(function(socket) {

	teks = `Total: ${_messages.length}\n\n`
	for (var messages of _messages) {
	teks += `${messages}\n`}

	socket.write(teks.trim());
	socket.pipe(socket);
});

server.on('connection', function(socket) {
    console.log('A new connection has been established.');


    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function(chunk) {
        console.log(`Data received from client: ${chunk.toString()}`);

              //-- Save Message         		
			  _messages.push(chunk.toString())
			  fs.writeFileSync('./messages.json', JSON.stringify(_messages))
  
	});

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});


server.listen(8080);



