var net = require('net');
let fs = require('fs');
const _messages = JSON.parse(fs.readFileSync('messages.json'));
// MySql COnnect to db_main------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var mysql = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'secret',
database : 'db_main'
});
connection.connect();
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


		
		connection.query('DELETE FROM Users WHERE username = "JoeJoe"', function (error, results, fields) {
			if (error) throw error;
			console.log('Deleted all right?: ', results);
		});

		connection.query('INSERT INTO Users (username) VALUES ("JoeJoe")', function (error, results, fields) {
			if (error) throw error;
		});

		connection.query('SELECT * FROM Users', function (error, results, fields) {
		if (error) throw error;
		console.log('The usernames are: ', results);
		});
		
		

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


