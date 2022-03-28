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
	serverInfo("now processing received data of ip "+socket.remoteAddress)
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
	//	 _messages.push(receivedMessage.toString())
	//	 fs.writeFileSync('./messages.json', JSON.stringify(_messages))

		
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
		// args 3 will be email
		// id will be set by database itself!
		var id;

		// connection.query('DELETE FROM Users WHERE username = "JoeJoe"', function (error, results, fields) {
		//	if (error) throw error;
			// console.log('Deleted all right?: ', results);
		// });

		connection.query( // register userstuff
				`INSERT INTO Users (username, password, email, account_created, xp, coins, logins) 
				VALUES ("${args[1]}","${args[2]}","${args[3]}","${date}",0,10,1)`

				, function (error, results, fields) {
					if (error) throw error;
					console.log('Yey a new registration! >_< ');
				});

		connection.query( // get the users id

		`SELECT user_id FROM Users
		WHERE username="${args[1]}" AND password = "${args[2]}" AND email= "${args[3]}"`

		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			var res = JSON.parse(JSON.stringify(results)); // Stringify makes it easy to access
			id = res[0].user_id;

			//-- Save Message         		
			_messages.push(args[1]+" "+id+" "+socket.remoteAddress)
			fs.writeFileSync('./messages.json', JSON.stringify(_messages))


			serverInfo('Hey this user got the user_id ', id);
		});
break;
// Login ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "login":
	serverInfo("new login")
break;
// set xp ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setXp":

		// args 0 will be "setxp"
		// args 1 will be id
		// args 2 will be newxp
		
		connection.query(

			`UPDATE Users
			SET xp = ${args[2]}
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) throw error;
				
			});
	
			//logAll();
	serverInfo("xp updated of user #"+args[1])
break;
// set energy ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setEnergy":

		// args 0 will be "setenergy"
		// args 1 will be id
		// args 2 will be newenergy
		
		connection.query(

			`UPDATE Users
			SET xp = ${args[2]}
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) throw error;
			});
	
			logAll();

	serverInfo("energy updated of user #"+args[1])
break;
// if no case was set ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
default:
//-- Save Message         		
_messages.push(args[1]+" "+id)
fs.writeFileSync('./messages.json', JSON.stringify(_messages))
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
	console.log(">_< (receiving) " + info)
}

function logAll(){
	connection.query('SELECT * FROM Users', function (error, results, fields) {
		if (error) throw error;
		console.log('All tables: ', results);
	});
}

server.listen(port);
serverInfo("Started server on port: " + port)


