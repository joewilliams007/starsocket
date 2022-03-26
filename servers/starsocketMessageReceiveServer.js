var net = require('net');
let fs = require('fs');
const _messages = JSON.parse(fs.readFileSync('messages.json'));
// Server Ports------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var port = 2224;
var server = net.createServer();
// DataBase ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'database name'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
// StartServer ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var server = net.createServer(function(socket) {

	console.log('--------------------------------------------')
	serverInfo('A new connection has been established.');
	
    var receivedMessage = ""

	socket.on('data', function(chunk) {
		//serverInfo(`receiving message chunk...`)
		receivedMessage += chunk.toString()
	});
	
	socket.on('end', function() {
		serverInfo("size of received message string: " + receivedMessage.length.toString())
		if(receivedMessage.length > 0){
			serverInfo("received message: " + receivedMessage)
			
		}
		serverInfo('Closing connection with the client')
		console.log('--------------------------------------------')

		 //-- Save Message         		
		 _messages.push(receivedMessage.toString())
		 fs.writeFileSync('./messages.json', JSON.stringify(_messages))

		 switch(receivedMessage.toString().split(" ")[0]) {
			case "hi":
			  serverInfo("case was hi")
			  break;
			case "y":
				serverInfo("case was y")
			  break;
			default:
				serverInfo("case was none")
		  }

		socket.destroy()
	});

	socket.on('error', function(err) {
		socket.destroy()
	});
});

function serverInfo(info){
	console.log("-> @Message Receive Server: " + info)
}

server.listen(port);
serverInfo("Started server on port: " + port)


