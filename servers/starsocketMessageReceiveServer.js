// >_< server index ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// 	1 requiere plugins
// 	2 connect do database
// 	3 server
// 		3.1 server config
// 		3.2 start server
// 	4 switch4cases
//		4.0 get anything
// 		4.1 register
// 		4.2 login
// 		4.3 set password
// 		4.4 set username
// 		4.5 set email
// 		4.6 set xp
// 		4.7 set age
// 		4.8 set weight
// 		4.9 set energy
// 		4.10 set logins
// 	5 default case
// 		5.1 end of cases
// 	6 functions
// 	7 end of server
// 		7.1 end of file

// server index ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 1 requiere plugins ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var net = require('net');
let fs = require('fs');
const _messages = JSON.parse(fs.readFileSync('messages.json'));
// 2 MySql COnnect to db_main------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var mysql = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'secret',
database : 'db_main'
});
connection.connect();
// 3 Server ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 3.1 Server Ports------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var port = 2224;
var server = net.createServer();
// 3.2 StartServer ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
// 4 Case message starts with ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 4.0 get anything ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "get":
	serverInfo("new get-request")
	// args 0 will be login
	// args 1 will be what to get
	// args 2 will be id
	// args 3 will be password

	connection.query( // get the users stuff

		`SELECT * FROM Users
		WHERE user_id="${args[2]}" AND password = "${args[3]}"`

		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			var res = JSON.parse(JSON.stringify(results)); // Stringify makes it easy to access
			result = "";

			if (args[0]=="xp") {
				result = res[0].xp
			} // ... etc add more when needed !


			//-- Save Message         		
			_messages.push(socket.remoteAddress+" "+args[2]+" "+args[3]+" "+result)
			fs.writeFileSync('./messages.json', JSON.stringify(_messages))
			serverInfo('Hey this user got the user_id ', args[1]);
		});
break;
// 4.1 register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
			_messages.push(socket.remoteAddress+" "+args[1]+" "+id)
			fs.writeFileSync('./messages.json', JSON.stringify(_messages))


			serverInfo('Hey this user got the user_id ', id);
		});
break;
// 4.2 Login ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "login":
	serverInfo("new login")
	// args 0 will be login
	// args 1 will be id
	// args 2 will be password
	connection.query( // get the users stuff

		`SELECT * FROM Users
		WHERE user_id="${args[1]}" AND password = "${args[2]}"`

		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			var res = JSON.parse(JSON.stringify(results)); // Stringify makes it easy to access

		//	serverInfo(res[0].account_created)
		//	serverInfo(res[0].username)

			//-- Save Message         		
			_messages.push(socket.remoteAddress+" "+args[1]+" "+args[2]+" "+res[0].username+" "+res[0].xp+" "+res[0].age+" "+res[0].weight+" "+res[0].coins+" "+res[0].email+" "+res[0].logins)
			fs.writeFileSync('./messages.json', JSON.stringify(_messages))
			serverInfo('Hey this user got the user_id ', args[1]);
		});
break;
// 4.3 set password ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setPassword":
	var changing = "password"

		connection.query(
			`UPDATE Users
			SET ${changing} = "${args[2]}"
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating "+changing+" of #"+args[1]);
				
			});
	serverInfo(changing+" updated of user #"+args[1])
	
break;
// 4.4 set username ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setUsername":
	var changing = "username"
		connection.query(
			`UPDATE Users
			SET ${changing} = "${args[2]}"
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating "+changing+" of #"+args[1]);
				
			});
	serverInfo(changing+" updated of user #"+args[1])
	
break;
// 4.5 set email ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setEmail":
	var changing = "email"
		connection.query(
			`UPDATE Users
			SET ${changing} = "${args[2]}"
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating "+changing+" of #"+args[1]);
				
			});
	serverInfo(changing+" updated of user #"+args[1])
	
break;
// 4.6 set xp ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setXp":	
		connection.query(

			`UPDATE Users
			SET xp = ${args[2]}
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating xp of #"+args[1]);
				
			});
	serverInfo("xp updated of user #"+args[1])
	
break;
// 4.7 set age ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setAge":
	
		var changing = "age"
		connection.query(

			`UPDATE Users
			SET ${changing} = ${args[2]}
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating "+changing+" of #"+args[1]);
				
			});
	
	serverInfo(changing+" updated of user #"+args[1])

break;
// 4.8 set weight ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setWeight":
	var changing = "weight"
		
		connection.query(
			`UPDATE Users
			SET ${changing} = ${args[2]}
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating "+changing+" of #"+args[1]);
				
			});
	serverInfo(changing+" updated of user #"+args[1])
	
break;
// 4.9 set energy ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setEnergy":

		connection.query(

			`UPDATE Users
			SET xp = ${args[2]}
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating energy of #"+args[1]);
			});
	
			logAll();

	serverInfo("energy updated of user #"+args[1])

break;
// 4.10 set logins ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setLogins":

	var changing = "logins"
		
		connection.query(
			`UPDATE Users
			SET ${changing} = ${args[2]}
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating "+changing+" of #"+args[1]);
				
			});
	serverInfo(changing+" updated of user #"+args[1])

break;
// 5 if no case was set ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
default:
    serverInfo("no valid case")

// 5.1 End of cases ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
			}

		socket.destroy()
	});

	socket.on('error', function(err) {
		socket.destroy()
	});
});
// 6 functions ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
function serverInfo(info){
	console.log(">_< (receiving) " + info)
}

function logAll(){
	connection.query('SELECT * FROM Users', function (error, results, fields) {
		if (error) throw error;
		console.log('All tables: ', results);
	});
}
// 7 End of server ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
server.listen(port);
serverInfo("Started server on port: " + port)
// 7.1 End of file >_< ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					


