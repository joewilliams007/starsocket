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
// 		4.11 feedback
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
const _feedback = JSON.parse(fs.readFileSync('feedback.json'));
// 2 MySql COnnect to db_main------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var mysql = require('mysql');
const { exec } = require('child_process');
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

	console.log('-------------------------------------------- RECEIVING DATA FROM CLIENT ✅')
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

		`SELECT * FROM Usersa
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
				`INSERT INTO Users (username, password, email, account_created, xp, coins, logins, weight, age, energy, plan1, plan2, plan3, plan4, plan5) 
				VALUES ("${args[1]}","${args[2]}","${args[3]}","${date}",0,10,1, 0, 0, 0,"none","none","none","none","none")`

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

			exec("mkdir users/"+id)
			fs.appendFile('./users/'+id+'/log.json', '[]', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });
			  
			  fs.appendFile('./users/'+id+'/plan1.json', '[]', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });

			  fs.appendFile('./users/'+id+'/plan2.json', '[]', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });

			  fs.appendFile('./users/'+id+'/plan3.json', '[]', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });

			  fs.appendFile('./users/'+id+'/plan4.json', '[]', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });

			  fs.appendFile('./users/'+id+'/plan5.json', '[]', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });

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
try {
			//-- Save Message         		
			_messages.push(socket.remoteAddress+" %SPORTDASH%"+args[1]+"%SPORTDASH%"+args[2]+"%SPORTDASH%"
			+res[0].username+"%SPORTDASH%"
			+res[0].xp+"%SPORTDASH%"
			+res[0].age+"%SPORTDASH%"
			+res[0].weight+"%SPORTDASH%"
			+res[0].coins+"%SPORTDASH%"
			+res[0].energy+"%SPORTDASH%"

			/* +" PLANS "
			+res[0].plan1+" "
			+res[0].plan2+" "
			+res[0].plan3+" "
			+res[0].plan4+" "
			+res[0].plan5
			+" PROGRESS "
			+res[0].todayProgress+" "
			+res[0].weekProgress+" "
			+res[0].day+" "
			+res[0].week+" "
			+res[0].login_streak+" "
			+res[0].last_login+" "
			+res[0].logins+" "
			+res[0].theme+" "
			+res[0].error_styles+" "
			+res[0].log 
			*/

			)

			fs.writeFileSync('./messages.json', JSON.stringify(_messages))
			serverInfo('Hey this user got the user_id ', args[1]);
} catch (err) {
	_messages.push(socket.remoteAddress+" err")
	fs.writeFileSync('./messages.json', JSON.stringify(_messages))
	serverInfo('error ', args[1]);
}
			
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
// 4.10.1 set energy ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setUsername":

		connection.query(

			`UPDATE Users
			SET username = ${args[2]}
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating username of #"+args[1]);
			});
	
		

	serverInfo("username updated of user #"+args[1])

break;
// 4.11 upload plans ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "upload_plans":
var changing = "plans"

let data = message.split("##########")[1].replace("Λ","A");
var id = args[1];

fs.appendFile('users/'+id+'/plan'+args[2]+'.json', '['+data+']', function (err) {
	if (err) throw err;
  });

	serverInfo("uploading plan "+args[2]+" of user #"+args[1])
break;
// 4.12 download plans ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "downloadPlans":


var plan1;
var plan2;
var plan3;
var plan4;
var plan5;

		fs.readFile("./users/"+args[1]+"plan1.json", "utf8", (err, response) => {
			if (err) {
			  console.error(err);
			  return;
			}
			var data = JSON.parse(response);
			plan1 = JSON.stringify(data);
		  });
		  fs.readFile("./users/"+args[1]+"plan2.json", "utf8", (err, response) => {
			if (err) {
			  console.error(err);
			  return;
			}
			var data = JSON.parse(response);
			plan2 = JSON.stringify(data);
		  });
		  fs.readFile("./users/"+args[1]+"plan3.json", "utf8", (err, response) => {
			if (err) {
			  console.error(err);
			  return;
			}
			var data = JSON.parse(response);
			plan3 = JSON.stringify(data);
		  });
		  fs.readFile("./users/"+args[1]+"plan4.json", "utf8", (err, response) => {
			if (err) {
			  console.error(err);
			  return;
			}
			var data = JSON.parse(response);
			plan4 = JSON.stringify(data);
		  });
		  fs.readFile("./users/"+args[1]+"plan5.json", "utf8", (err, response) => {
			if (err) {
			  console.error(err);
			  return;
			}
			var data = JSON.parse(response);
			plan5 = JSON.stringify(data);
		  });
			//-- Save Message         		
			_messages.push(socket.remoteAddress
			+" ##########"
			+plan1+"##########"
			+plan2+"##########"
			+plan3+"##########"
			+plan4+"##########"
			+plan5+"##########"

			)

			fs.writeFileSync('./messages.json', JSON.stringify(_messages))
			serverInfo('Hey this user got the user_id ', args[1]);
break;

break;
// 4.11 feedback ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "feedback":
		
	_feedback.push(message)
	fs.writeFileSync('./feedback.json', JSON.stringify(_feedback))

	serverInfo("RECEIVED FEEDBACK!!!!!\n"+message)

break;
// 5 if no case was set ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
default:
    serverInfo("no valid case")

// 5.1 End of cases ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
			}
			console.log('-------------------------------------------- FINISHED RECEIVING ✅')
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


