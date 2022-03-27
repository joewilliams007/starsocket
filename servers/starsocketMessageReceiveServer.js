var net = require('net');
let fs = require('fs');
const _messages = JSON.parse(fs.readFileSync('messages.json'));
// mySql ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();
// Server Ports------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var port = 2224;
var server = net.createServer();
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
		
		 var message = receivedMessage.toString();
		 var args = message.split(" ");
		 switch(args[0]) {
// Case message starts with ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "register":
	serverInfo("new registration")
break;

case "login":
	serverInfo("new login")
break;

default:
serverInfo("case was none")

// End of cases ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
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


