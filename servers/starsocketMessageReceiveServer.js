// >_< server index ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
// requiere plugins ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var net = require('net');
// plugins
const starPlan = require("../plugins/plans/starPlan.js") 
const aboutSportdash = require("../plugins/sportdash/about.js") 
const termsOfService = require("../plugins/sportdash/termsOfService.js") 
const shop = require("../plugins/sportdash/shop.js") 
const changelogApp = require("../plugins/sportdash/changelog.js") 
const leaderboard = require("../plugins/sportdash/leaderboard.js") 
const sendChatMessage = require("../plugins/online/chat.js") 
const boost = require("../plugins/sportdash/boost.js") 
const downloadPlans = require("../plugins/plans/downloadPlans.js") 
const getChatMessages = require("../plugins/online/getChatMessages.js") 
const profile = require("../plugins/online/profile.js") 
const clearChatMessages = require("../plugins/online/clearChatMessages.js") 
const register = require("../plugins/online/account/register.js") 
const login = require("../plugins/online/account/login.js") 
const downloadComments = require("../plugins/plans/comments/downloadComments.js") 


// MySql COnnect to db_main------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var mysql = require('mysql');
const { exec } = require('child_process');
const { isPromise } = require('util/types');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'secret',
database : 'db_main'
});
connection.connect();
// Server ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Server Ports------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var port = 2224;
var server = net.createServer();
// StartServer ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var server = net.createServer(function(socket) {

	console.log('-------------------------------------------- RECEIVING DATA FROM CLIENT ✅')
	serverInfo('A new connection has been established.');
	serverInfo("now processing received data of ip "+socket.remoteAddress)
    var receivedMessage = ""
	var ip = socket.remoteAddress
	var dir = "./user_messages/"+ip;

	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir, { recursive: true });
		
		fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
			if (err) throw err;
			console.log('Saved!');
		  });
	}
	
	var _messages;
	try {
	_messages = JSON.parse(fs.readFileSync("./user_messages/"+ip+"/messages.json"));
	} catch (err){
		try {
		fs.unlinkSync("./user_messages/"+ip+"/messages.json")
		} catch (err){

		}
		fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
			if (err) throw err;
			console.log('new messages created!');
			_messages = JSON.parse(fs.readFileSync("./user_messages/"+ip+"/messages.json"));
		  });
		  
	}

	socket.on('data', function(chunk) {
		//serverInfo(`receiving message chunk...`)
		receivedMessage += chunk.toString()
	});
	
	socket.on('end', function() {
		serverInfo("size of received message string: " + receivedMessage.length.toString())
		if(receivedMessage.length > 0){
			serverInfo("received message: " + receivedMessage)
			
		}
		
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
// about sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "aboutSportDash":
	reply(aboutSportdash())
break;
// changelog sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "changelog":
	reply(changelogApp())
break;
// shop sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "shop":
	reply(shop(message))
break;
// terms of service sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "terms_of_service":
	reply(termsOfService)
break;
// register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "register":
	serverInfo("new registration")
		connection.query( // register userstuff
				`INSERT INTO Users (username, password, email, account_created, xp, coins, logins, weight, age, energy) 
				VALUES ("${args[1]}","${args[2]}","${args[3]}","${date}",0,10,1, 0, 0, 0)`
				, function (error, results, fields) {
					if (error) throw error;
					console.log('Yey a new registration! >_< ');
		});

		connection.query( // get the users id
		`SELECT user_id FROM Users
		WHERE username="${args[1]}" AND password = "${args[2]}" AND email= "${args[3]}"`
		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			register(message, JSON.parse(JSON.stringify(results)))
		});
break;
// Login ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "login":
	serverInfo("new login")
	connection.query( // get the users stuff
		`SELECT * FROM Users
		WHERE user_id="${args[1]}" AND password = "${args[2]}"`
		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			reply(login(JSON.parse(JSON.stringify(results))))
});
break;
// get user profile ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getProfile":
connection.query( // get the users stuff
		`SELECT * FROM Users
		WHERE user_id="${args[1]}"`
		
		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			reply(profile(message,JSON.stringify(results)))			
});
break;
// send message ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "chat":
	sendChatMessage(message)
break;
// get chat ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getChat":
	reply(getChatMessages(message))
break;
// clear chat ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "clearChat":
	clearChatMessages(message);
break;
// 4.2.x get inbox ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "clearinbox":
	var userid = args[1]
	fs.unlinkSync('./users/'+userid+'/chatinbox.txt')
	fs.appendFile('./users/'+userid+'/chatinbox.txt', '', function (err) {
		if (err) throw err;
		console.log('Saved!');
	  });
break;
// get inbox ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "mychatinbox":
	var userid = args[1]
try {
	var comments = fs.readFileSync("./users/"+userid+"/chatinbox.txt");
	_messages.push(socket.remoteAddress+" "+comments)
	fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
} catch (err){
	
}
break;
// boost ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "boost":
	boost(ip)
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
// Leaderboard ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "leaderboard":	
		connection.query(
			`SELECT username, user_id, xp
			FROM Users
			ORDER BY xp DESC`
			, function (error, results, fields) {
				if (error) serverInfo(error.message);
				reply(leaderboard(JSON.parse(JSON.stringify(results))))
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
// download plans ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "downloadPlans":
	downloadPlans(message)
break;
// plan comments ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getComments":
	reply(downloadComments(message))
break;
// 4.12.2  comment on plan ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "commentPlan":
	var userid = args[2]
	var username = args[3]
	var planid = args[1].replace("#","")
	var comment = message.split("THECOMMENTISSTAR")[1]
	
	var datetime = new Date();
	var date = datetime.toISOString().slice(0,10)
	var time1 = datetime.toLocaleTimeString().split(":");
	var time2 = datetime.toLocaleTimeString().split(" ");
	var time = time1[0]+":"+time1[1]+" "+time2[1]
	var finalMessageChat = time+" "+date+"@"+username+" #"+userid+"@"+comment+"NEXTMESSAGEIS:;"

	fs.appendFile('plans/comments/'+planid+'.txt', "\n"+finalMessageChat, function (err) {
	if (err) {
		// append failed
	} else {
		// done
	}
	})
break;
// 4.12.. get plan stars ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getStars":
	reply(starPlan(args[1]))
break;
// 4.12..  star on plan ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "starPlan":
	var userid = "+#"+args[1]+"+"
	var planid = args[2]
	var stars = "none"

try {
stars = fs.readFileSync('plans/stars/'+planid+'.txt');
} catch (err) { }

if (stars.includes(userid)){
		try {
		_messages.push(socket.remoteAddress+" star-removed")
		fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
		
		var replace = require('replace-in-file');
		var options = {

			files: 'plans/stars/'+planid+'.txt',
			from: userid,
			to: ' ',
		  };

		  replace(options)
		  .then(changedFiles => {
			console.log('Modified files:', changedFiles.join(', '));
		  })
		  .catch(error => {
			console.error('Error occurred:', error);
		  });

	} catch (err) { }
} else {
	fs.appendFile('plans/stars/'+planid+'.txt', userid, function (err) {
	if (err) {
		// append failed
	} else {
		// done
	}
	})
	_messages.push(socket.remoteAddress+" star-added")
	fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
}
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
			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
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
	
	fs.appendFile("./users/"+to+"/chatinbox.txt","\n"+finalMessage, function (err) {
		if (err) {
			// append failed
		} else {
			// done
		}
		})
} catch (err) {

}
break;
// 4.11.1 get feedback ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getFeedback":
	
	var _feedback = JSON.parse(fs.readFileSync('feedback.json'));


	_messages.push(socket.remoteAddress+" "+_feedback.toString())
	fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))

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
// if no case was set ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
default:
    serverInfo("no valid case")
// reply ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	function reply(message){
		_messages.push(socket.remoteAddress+" "+message)
		fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
	}

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


