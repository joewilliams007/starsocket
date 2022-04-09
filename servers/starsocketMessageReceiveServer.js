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
// create directories
let fs = require('fs');
var dir = './plans/allplans';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}
var dir = './plans/allplansonline';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}
// 1 requiere plugins ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var net = require('net');
const _messages = JSON.parse(fs.readFileSync('messages.json'));

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


			var dir = "./users/"+id

			if (!fs.existsSync(dir)){
				fs.mkdirSync(dir, { recursive: true });
			}

			fs.appendFile('./users/'+id+'/log.json', '[]', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });
			  fs.appendFile('./users/'+id+'/inbox.json', '[]', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });
			  fs.appendFile('./users/'+id+'/chatinbox.json', '[]', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });
			  fs.appendFile('./users/'+id+'/plan1.txt', '', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });

			  fs.appendFile('./users/'+id+'/plan2.txt', '', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });

			  fs.appendFile('./users/'+id+'/plan3.txt', '', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });

			  fs.appendFile('./users/'+id+'/plan4.txt', '', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });

			  fs.appendFile('./users/'+id+'/plan5.txt', '', function (err) {
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
// 4.2.1 get user profile ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getProfile":

	connection.query( // get the users stuff

		`SELECT * FROM Users
		WHERE user_id="${args[1]}"`

		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			var res = JSON.parse(JSON.stringify(results)); // Stringify makes it easy to access

try {
			//-- Save Message         		
			_messages.push(socket.remoteAddress+" "
			+args[1]+" "
			+res[0].username+" "
			+res[0].xp+" "
			+res[0].today_progress+" "
			+res[0].week_progress+" "
			+res[0].age+" "
			+res[0].weight+" "
		

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
// 4.2.x send message ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "chat":
	var FROM = args[1]
	var to =  args[2]
	var datetime = new Date();
	var date = datetime.toISOString().slice(0,10)
	var time = datetime.toLocaleTimeString();
	var chatM = message.toString().split("MESSAGE&")[1]
	var finalMessage = "- - - - -\n"+date+" "+time+" by user #"+FROM+"\n- "+chatM

	serverInfo(finalMessage)
try {
	var _inbox = JSON.parse(fs.readFileSync("./users/"+to+"/chatinbox.json"));
	_inbox.push("\n"+finalMessage)
	fs.writeFileSync("./users/"+to+"/chatinbox.json", JSON.stringify(_inbox))
	serverInfo("saving message to #"+to+" from "+FROM)
} catch (err) {

}
break;
// 4.2.x get inbox ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "clearinbox":
	var userid = args[1]
	fs.unlinkSync('./users/'+userid+'/chatinbox.json')
	fs.appendFile('./users/'+userid+'/chatinbox.json', '[]', function (err) {
		if (err) throw err;
		console.log('Saved!');
	  });
break;
// 4.2.x.x get inbox ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "mychatinbox":
	var userid = args[1]

	var _inbox = JSON.parse(fs.readFileSync("./users/"+userid+"/chatinbox.json"));
	serverInfo(_inbox.toString())
	_messages.push(socket.remoteAddress+" "+_inbox.toString())
	fs.writeFileSync('./messages.json', JSON.stringify(_messages))
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
// 4.6,1 Leaderboard ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "leaderboard":	
		connection.query(

			`SELECT username, user_id, xp
			FROM Users
			ORDER BY xp DESC`
	
			, function (error, results, fields) {
				if (error) serverInfo(error.message);
				var res = JSON.parse(JSON.stringify(results)); // Stringify makes it easy to access
				result = "";
	
					console.log(res)

					var leaderboard = "";
					
					for (const item of res.values()) {  
						console.log(`Cache item: ${JSON.stringify(item)}`)
						leaderboard+="\n"+JSON.stringify(item)
					}

					console.log(leaderboard)
	
				serverInfo('Hey this user got the user_id ', args[1]);
			});


	
break;

// 4.6.1 set todays progress ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setTodayProgress":	
		connection.query(

			`UPDATE Users
			SET today_progress = ${args[2]}
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating day xp of #"+args[1]);
				
			});
	serverInfo("day xp updated of user #"+args[1])
	
break;
// 4.6.2 set weeks progress ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setWeekProgress":	
		connection.query(

			`UPDATE Users
			SET week_progress = ${args[2]}
			WHERE user_id = ${args[1]}`
	
			, function (error, results, fields) {
				if (error) serverInfo("error updating week xp of #"+args[1]);
				
			});
	serverInfo("week xp updated of user #"+args[1])
	
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
var planId = args[3];
var data = message.split("##########")[1].replace("Λ","A");
var id = args[1];

// upload to my account
fs.unlink('users/'+id+'/plan'+args[2]+'.txt', function (err) {
    if (err) throw err;
    console.log('File deleted!');
});
fs.appendFile('users/'+id+'/plan'+args[2]+'.txt', data, function (err) {
	if (err) throw err;
  });
// upload to all 
fs.appendFile('plans/allplans/'+planId+'.txt', data, function (err) {
	if (err) throw err;
});
fs.appendFile('plans/comments/'+planId+'.txt', "\n", function (err) {
	if (err) throw err;
});

	serverInfo("uploading plan "+args[2]+" of user #"+args[1])
break;
// 4.11.1 upload plans ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "upload_plans_everyone":
var changing = "plans"

var data = message.split("##########")[1].replace("Λ","A");
var id = args[1];
var category = args[4].split("XXXXXXXX")[1];
var planId = args[3];
// upload to specific category
var dir = './plans/'+category;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.appendFile('plans/'+category+'/'+planId+'.txt', data, function (err) {
	if (err) throw err;
});
// upload to all online
fs.appendFile('plans/allplansonline/'+planId+'.txt', data, function (err) {
	if (err) throw err;
});
// upload to all 
fs.appendFile('plans/allplans/'+planId+'.txt', data, function (err) {
	if (err) throw err;
});
fs.appendFile('plans/comments/'+planId+'.txt', "\n", function (err) {
	if (err) throw err;
});


exec ("rm -rf ./plans/allplansonline/0.txt")
// upload to users account
fs.unlink('users/'+id+'/plan'+args[2]+'.txt', function (err) {
    if (err) throw err;
    console.log('File deleted!');
});
fs.appendFile('users/'+id+'/plan'+args[2]+'.txt', data, function (err) {
	if (err) throw err;
});

	serverInfo("uploading plan "+args[2]+" of user #"+args[1])
break;
// 4.12 download plans ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "downloadPlans":
try {

	let plan1 = fs.readFileSync("./users/"+args[1]+"/plan1.txt");
	let plan2 = fs.readFileSync("./users/"+args[1]+"/plan2.txt");
	let plan3 = fs.readFileSync("./users/"+args[1]+"/plan3.txt");
	let plan4 = fs.readFileSync("./users/"+args[1]+"/plan4.txt");
	let plan5 = fs.readFileSync("./users/"+args[1]+"/plan5.txt");


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
		} catch (err) {
			_messages.push(socket.remoteAddress+" err")
			fs.writeFileSync('./messages.json', JSON.stringify(_messages))
			serverInfo('error ', args[1]);
		}
break;
// 4.12.1 get plan comments ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getComments":
	var planid = args[1].replace("#","")
try {
	var comments = fs.readFileSync('plans/comments/'+planid+'.txt');

			//-- Save Message         		
			_messages.push(socket.remoteAddress
			+" "
			+comments
			)

			fs.writeFileSync('./messages.json', JSON.stringify(_messages))
			serverInfo('Hey this user got the user_id ', args[1]);
		} catch (err) {
			_messages.push(socket.remoteAddress+" errasdasdasdasdasdasdasdasd")
			fs.writeFileSync('./messages.json', JSON.stringify(_messages))
			serverInfo('error ', args[1]);
		}
break;
// 4.12.2  comment on plan ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "commentPlan":
	var userid = args[2]
	var username = args[3]
	var planid = args[1].replace("#","")
	var comment = message.split("THECOMMENTISSTAR")[1]
	
	var datetime = new Date();
	var date = datetime.toISOString().slice(0,10)
	var time = datetime.toLocaleTimeString();
	var finalMessage = "\n"+date+" "+time+" by user "+username+" (#"+userid+")\n- "+comment

	fs.appendFile('plans/comments/'+planid+'.txt', "\n"+finalMessage, function (err) {
	if (err) {
		// append failed
	} else {
		// done
	}
	})
break;
// 4.12.2 clear comments ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "clearComments":
	var planid = args[1]
	fs.unlinkSync('plans/comments/'+planid+'.txt')
	fs.appendFile('plans/comments/'+planid+'.txt', '\n', function (err) {
		if (err) throw err;
		console.log('comments deleted!');
	  });
break;
// 4.11 random plan ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "randomPlan":
var randomFile = require('select-random-file')
var dir = './plans/allplansonline'

randomFileGet()
serverInfo("------------------------------------------------------")
	
function randomFileGet(){
	randomFile(dir, (err, file) => {
		if (file.length<6){
			randomFileGet()
		} else {
			let plan = fs.readFileSync("./plans/allplansonline/"+file);
			serverInfo(`The random file is: ${file}.`)
			_messages.push(socket.remoteAddress+" "+plan)
			fs.writeFileSync('./messages.json', JSON.stringify(_messages))
			serverInfo("------------------------------------------------------")
		}
	})
}
break;
// 4.11 feedback ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "feedback":
	var _feedback = JSON.parse(fs.readFileSync('feedback.json'));
var to = args[1];
var datetime = new Date();
var date = datetime.toISOString().slice(0,10)
var time = datetime.toLocaleTimeString();
var chatM = message.toString().split("MESSAGE&")[1]
var finalMessage = "- - - - -\n"+date+" "+time+" \n- you submitted a feedback/report!"

try{
	_feedback.push(message.replace("feedback 14","\n\n"))
	fs.writeFileSync('./feedback.json', JSON.stringify(_feedback))
} catch (err) {

}
	serverInfo("RECEIVED FEEDBACK!!!!!\n"+message)


	serverInfo(finalMessage)
try {
	var _inbox = JSON.parse(fs.readFileSync("./users/"+to+"/chatinbox.json"));
	_inbox.push("\n"+finalMessage)
	fs.writeFileSync("./users/"+to+"/chatinbox.json", JSON.stringify(_inbox))
} catch (err) {

}
break;
// 4.11.1 get feedback ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getFeedback":
	
	var _feedback = JSON.parse(fs.readFileSync('feedback.json'));


	_messages.push(socket.remoteAddress+" "+_feedback.toString())
	fs.writeFileSync('./messages.json', JSON.stringify(_messages))

serverInfo("sending feedback to developer")
break;
// 4.11.2 clear feedback ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "clearAllFeedbackDev":
	var _feedback = JSON.parse(fs.readFileSync('feedback.json'));
	fs.unlinkSync('./feedback.json')
	fs.appendFile('./feedback.json', '[]', function (err) {
		if (err) throw err;
		console.log('deleted feedback!');
	  });
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


