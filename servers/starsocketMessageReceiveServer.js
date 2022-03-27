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
		
		var today = new Date();
		var yyyy = today.getFullYear();
		let mm = today.getMonth() + 1; // Months start at 0!
		let dd = today.getDate();
		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
		var date = yyyy + '-' + mm + '-' + dd;

		var message = receivedMessage.toString();
		var args = message.split(" ");
		switch(args[0]) {
// Case message starts with ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "register":
	serverInfo("new registration")

		// args 0 will be register
		// args 1 will be username
		// args 2 will be password
		// id will be set by database itself!
		
		connection.query(`SELECT * FROM Users WHERE username = ${args[0]}`, function (error, results, fields) {
			if (error) throw error;
			console.log('Deleted all right?: ', results);
		});

		connection.query('DELETE FROM Users WHERE username = "JoeJoe"', function (error, results, fields) {
			if (error) throw error;
			console.log('Deleted all right?: ', results);
		});

		connection.query(

		`INSERT INTO Users (username, password, account_created, xp, coins, logins) 
		VALUES ("${args[1]}","${args[2]}","${date}",0,10,1)`

		, function (error, results, fields) {
			if (error) throw error;
		});

		connection.query('SELECT * FROM Users', function (error, results, fields) {
		if (error) throw error;
		console.log('All tables: ', results);
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


