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
const viewPlan = require("../plugins/plans/viewPlan.js") 
const searchElement = require("../plugins/plans/searchElement.js") 
const aboutSportdash = require("../plugins/sportdash/about.js") 
const termsOfService = require("../plugins/sportdash/termsOfService.js") 
const shop = require("../plugins/sportdash/shop.js") 
const changelogApp = require("../plugins/sportdash/changelog.js") 
const leaderboard = require("../plugins/sportdash/leaderboard.js") 
const sendChatMessage = require("../plugins/online/chat.js") 
const followers = require("../plugins/online/followers.js") 
const follows = require("../plugins/online/following.js") 
const boost = require("../plugins/sportdash/boost.js") 
const futureLogApp = require("../plugins/sportdash/futureLogApp.js") 
const downloadPlans = require("../plugins/plans/downloadPlans.js") 
const downloadPlanById = require("../plugins/plans/downloadPlanById.js") 
const getChatMessages = require("../plugins/online/getChatMessages.js") 
const profile = require("../plugins/online/profile.js") 
const searchUser = require("../plugins/online/searchUser.js") 
const clearChatMessages = require("../plugins/online/clearChatMessages.js") 
const register = require("../plugins/online/account/register.js") 
const login = require("../plugins/online/account/login.js") 
const downloadComments = require("../plugins/plans/comments/downloadComments.js") 
const ipFolder = require("../plugins/sportdash/ipFolder.js") 

// Encryption 
const Cryptr = require('cryptr');
const cryptr = new Cryptr('sportdashIsFireBroThisIsSickHeheheKeepSecret');

/*
var encryptedString = cryptr.encrypt('bacon');
var decryptedString = cryptr.decrypt(encryptedString);

console.log(encryptedString); // 2a3260f5ac4754b8ee3021ad413ddbc11f04138d01fe0c5889a0dd7b4a97e342a4f43bb43f3c83033626a76f7ace2479705ec7579e4c151f2e2196455be09b29bfc9055f82cdc92a1fe735825af1f75cfb9c94ad765c06a8abe9668fca5c42d45a7ec233f0
console.log(decryptedString); // bacon
*/

// MySql COnnect to db_main------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
mysql = require('mysql'); 
const { exec } = require('child_process');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'johannw2004',
database : 'db_main'
});
connection.connect();
// Server ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Server Ports------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var port = 2224;
var server = net.createServer();
// StartServer ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var server = net.createServer(function(socket) {

	console.log('✅ - - - - - - - -  RECEIVING DATA FROM CLIENT - - - - - - - -')
	serverInfo('NEW CONNECTION OF IP: '+socket.remoteAddress);
    var receivedMessage = ""
	var ip = socket.remoteAddress
	var _messages = ipFolder(ip)

	socket.on('data', function(chunk) {
		//serverInfo(`receiving message chunk...`)
		receivedMessage += chunk.toString() 
	});
	
	socket.on('end', function() {
		serverInfo("SIZE OF MEESAGE: " + receivedMessage.length.toString()+" characters")
	if(receivedMessage.length > 0){
		serverInfo("RECEIVED MESSAGE: " + receivedMessage)
			
	}

		
		
		var today = new Date();
		var yyyy = today.getFullYear();
		let mm = today.getMonth() + 1; // Months start at 0!
		let dd = today.getDate();
		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
		var date = yyyy + '-' + mm + '-' + dd;

		var messageSec = receivedMessage.toString();
		var message = messageSec.split("§")[1];
		var user_id = messageSec.split(" ")[0];
		var password = messageSec.split(" ")[1];
		var username = messageSec.split(" ")[2];

		serverInfo("CONNECTED USER: "+username+" #"+user_id)


	/*	serverInfo("new login")
		connection.query( // get the users stuff
		`SELECT * FROM Users
		WHERE user_id="${args[1]}" AND password = "${args[2]}"`
		, function (error, results, fields) {
		});

	*/
		
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
// future sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "futureLog":
	reply(futureLogApp())
break;
// shop sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "shop":
	reply(shop(message))
break;
// terms of service sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "terms_of_service":
	reply(termsOfService())
break;
// register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "register":
	serverInfo("new registration")

	
	var encryptedPassword = cryptr.encrypt(args[2]);
	
// var decryptedString = cryptr.decrypt(encryptedString);
//	console.log(decryptedString); // bacon

		connection.query( // register userstuff
				`INSERT INTO Users (username, password, email, account_created, xp, coins, logins, weight, age, energy, follows, followers) 
				VALUES ("${args[1]}","${encryptedPassword}","${args[3]}","${date}",0,10,1, 0, 0, 0, 0, 0)`
				, function (error, results, fields) {
					if (error) throw error;
					console.log('Yey a new registration! >_< ');
		});

		connection.query( // get the users id
		`SELECT user_id FROM Users
		WHERE username="${args[1]}" AND password = "${encryptedPassword}" AND email= "${args[3]}"`
		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			reply(register(message, results))
		});
break;
// Login ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "login":
	serverInfo("new login")

	connection.query( // get the users stuff
		`SELECT * FROM Users
		WHERE user_id="${args[1]}"`
		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			var res = JSON.parse(JSON.stringify(results))

			if (cryptr.decrypt(res[0].password) == args[2]) {
				reply(login(message, results))
			} else {
				reply("WRONG")
			}
});
break;
// get user profile ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getProfile":
connection.query( // get the users stuff
		`SELECT * FROM Users
		WHERE user_id="${args[1]}"`

		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			reply(profile(message, results))			
});
break;
// followers ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "followers":
	reply(followers(args[1]))
break;
// follows ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "follows":
	reply(follows(args[1]))
break;
// follow/unfollow ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "follow":
	var userid = args[1] // source
	var useridplus = "+#"+args[1]+"+" // source

	var id = args[2] // target id
	var idplus = "+#"+args[2]+"+" // target id
	var followers = "none"

	try {
		followers = fs.readFileSync('./users/'+id+'/followers.txt');
	} catch (err) { }

if (followers.includes(userid)){
		try {
		reply("follow-removed")

		var followers = fs.readFileSync('./users/'+id+'/followers.txt');
		followers1 = followers.toString().split('#').length-2;

		connection.query(
			`UPDATE Users
			SET followers = ${Number(followers1)}
			WHERE user_id = "${userid}"`
			, function (error, results, fields) {
			if (error) serverInfo("error updating ");
		});

		var following = fs.readFileSync('./users/'+id+'/follows.txt');
		following1 = following.toString().split('#').length-2;

		connection.query(
			`UPDATE Users
			SET follows = ${Number(following1)}
			WHERE user_id = "${id}"`
			, function (error, results, fields) {
			if (error) serverInfo("error updating ");
		});


					var replace = require('replace-in-file');
					var options = {

						files: './users/'+id+'/followers.txt',
						from: useridplus,
						to: ' ',
					};

					replace(options)
					.then(changedFiles => {
						console.log('Modified files:', changedFiles.join(', '));
					})
					.catch(error => {
						console.error('Error occurred:', error);
					});

					var replace = require('replace-in-file');
					var options = {

						files: './users/'+userid+'/follows.txt',
						from: idplus,
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


	fs.appendFile('./users/'+id+'/follows.txt', useridplus, function (err) {
	if (err) {
		// append failed
	} else {

		fs.appendFile('./users/'+userid+'/follows.txt', useridplus, function (err) {
			if (err) { 	}})

		followers = "";
		try {
			followers = fs.readFileSync('./users/'+id+'/followers.txt');
			followers1 = followers.toString().split('#').length-2;
		} catch(err){
		
			fs.appendFile('./users/'+id+'/followers.txt', '', function (err) {
				if (err) throw err;
				console.log('Saved!');

			followers = fs.readFileSync('./users/'+id+'/followers.txt');
			followers1 = followers.toString().split('#').length-2;
			  });

		}

		connection.query(
			`UPDATE Users
			SET followers = ${Number(followers1)}
			WHERE user_id = "${id}"`
			, function (error, results, fields) {
			if (error) serverInfo("error updating ");
		});

		var following = fs.readFileSync('./users/'+id+'/follows.txt');
		following1 = following.toString().split('#').length-2;

		connection.query(
			`UPDATE Users
			SET follows = ${Number(following1)}
			WHERE user_id = "${userid}"`
			, function (error, results, fields) {
			if (error) serverInfo("error updating ");
		});
	}
	})
	reply("follow-added")
}
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
// search users ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "searchFriends":
	connection.query( // get the users stuff
		`SELECT * FROM Users
		WHERE username LIKE '%${message.split("=")[1]}%';`
		, function (error, results, fields) {
			if (error) serverInfo(error.message);
	reply(searchUser(message, results))
});
break;
// search elements ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "searchElement":
	connection.query( // get the users stuff
		`SELECT * FROM Elements
		WHERE element_name LIKE '%${message.split("=")[1]}%';`
		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			reply(searchElement(message, results))
});
break;
// add to elements ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "addElement":
element = message.split("@")
element_name = element[1]
description = element[2]
duration = element[3]
type = element[4]
creator_name = element[5]
creator_id = element[6]
		connection.query( // register userstuff
				`INSERT INTO Elements (element_name, description, duration, type, element_usage, reports,creator_name,creator_id) 
				VALUES ("${element_name}","${description}","${duration}","${type}",0,0,"${creator_name}","${creator_id}")`
				, function (error, results, fields) {
					if (error) throw error;
					console.log('Yey new element! >_< ');
		});

break;
// delete elements ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "deleteElement":
	connection.query( // register userstuff
	`DELETE FROM Elements 
	WHERE element_id = ${args[1]};`
	, function (error, results, fields) {
		if (error) serverInfo("error");
		console.log('deleted element! >_< ');
});
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
} catch (err){}
break;
// boost ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "boost":
	boost(ip)
break;
// 4.3 set password ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setPassword":
	
	var encryptedPassword = cryptr.encrypt(args[2]);
	connection.query(
		`UPDATE Users
		SET password = ${encryptedPassword}
		WHERE user_id = ${args[1]}`
		, function (error, results, fields) {
			if (error) serverInfo("error updating "+option+" of #"+args[1]);
		});
		serverInfo(option+" updated of user #"+args[1])

break;
// 4.4 set username ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setUsername":
	set("username")
break;
// 4.5 set email ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setEmail":
	set("email")
break;
// 4.6 set xp ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setXp":	
	set("xp")
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
	set("today_progress")
break;
// 4.6.2 set weeks progress ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setWeekProgress":	
	set("week_progress")
break;
// 4.7 set age ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setAge":
	set("age")
break;
// 4.8 set weight ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setWeight":
	set("weight")
break;
// 4.9 set energy ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setEnergy":
	set("energy")
break;
// 4.10 set logins ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setLogins":	
	set("logins")
break;
// 4.10.1 set energy ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setUsername":
	set(username)	
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

var db =  message.split("##########");

var dateInSec = Math.floor(new Date() / 1000) // in seconds
connection.query( // register userstuff
`INSERT INTO Plans (plan_name, plan_description, creator_name, creator_id,plan_id, duration, category, difficulty, reports, plan_usage, plan_stars,privacy,plan_views,date) 
VALUES ("${db[2]}","${db[3]}","${db[4]}","${db[5]}","${planId}",${db[7]},"${db[8]}","${db[9]}",0,0,0,1,0,${dateInSec})`
, function (error, results, fields) {
	if (error) throw error;
});

	serverInfo("uploading plan "+args[2]+" of user #"+args[1])
break;
// upload plans ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
var db =  message.split("##########");
var dateInSec = Math.floor(new Date() / 1000) // in seconds
connection.query( // register userstuff
`INSERT INTO Plans (plan_name, plan_description, creator_name, creator_id,plan_id, duration, category, difficulty, reports, plan_usage, plan_stars,privacy,plan_views,date) 
VALUES ("${db[2]}","${db[3]}","${db[4]}","${db[5]}","${planId}",${db[7]},"${db[8]}","${db[9]}",0,0,0,1,0,${dateInSec})`
, function (error, results, fields) {
	if (error) throw error;
});

	serverInfo("uploading plan "+args[2]+" of user #"+args[1])
break;
// download plans ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "downloadPlans":
	reply(downloadPlans(message))
break;
// download plan by id ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "downloadPlanById":
	reply(downloadPlanById(message))
break;
// plan comments ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getComments":

		connection.query( // get the users stuff
				`SELECT * FROM Comments
				WHERE plan_id="${args[1].replace("#","")}"`
		
				, function (error, results, fields) {
					if (error) serverInfo(error.message);
					reply(downloadComments(message, results))		
		});


	
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

	connection.query( 
`INSERT INTO Comments (creator_id, creator_name, plan_id, comment, date, reports, likes) 
VALUES ("${userid}","${username}","${planid}","${comment}","${time} ${date}",0,0)`
, function (error, results, fields) {
	if (error) throw error;
});

break;
// get plan stars ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getStars": // (and views)
	var viewsAndStars = starPlan(args[1])+"#"+viewPlan(args[1])
	reply(viewsAndStars)
break;
// view on plan ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "viewPlan":
	var userid = "+#"+args[1]+"+"
	var planid = args[2]
	var views = "none"

try {
	views = fs.readFileSync('plans/views/'+planid+'.txt');
} catch (err) { }

if (views.includes(userid)){
		
} else {

	fs.appendFile('plans/views/'+planid+'.txt', userid, function (err) {
	if (err) {
		// append failed
	} else {
		var views = fs.readFileSync('plans/views/'+planid+'.txt');
		views1 = views.toString().split('#').length-1;
	
		connection.query(
		`UPDATE Plans
		SET plan_views = ${Number(views1)}
		WHERE plan_id = "${planid}"`
		, function (error, results, fields) {
			if (error) throw serverInfo(error);
		});
	}
	})

}
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


		var stars = fs.readFileSync('plans/stars/'+planid+'.txt');
		stars1 = stars.toString().split('#').length-2;

		connection.query(
			`UPDATE Plans
			SET plan_stars = ${Number(stars1)}
			WHERE plan_id = "${planid}"`
			, function (error, results, fields) {
				if (error) serverInfo("error updating ");
			});

			
		
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
		var stars = fs.readFileSync('plans/stars/'+planid+'.txt');
		stars1 = stars.toString().split('#').length-1;
	
		connection.query(
		`UPDATE Plans
		SET plan_stars = ${Number(stars1)}
		WHERE plan_id = "${planid}"`
		, function (error, results, fields) {
			if (error) throw serverInfo(error);
		});
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
try {
	randomFileGet()
	serverInfo("------------------------------------------------------")
		
	function randomFileGet(){
		randomFile(dir, (err, file) => {
			try {
				if (file.length<6){
					randomFileGet()
				} else {
					let plan = fs.readFileSync("./plans/allplansonline/"+file);
					serverInfo(`The random file is: ${file}.`)
					_messages.push(socket.remoteAddress+" "+plan)
					fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
					serverInfo("------------------------------------------------------")
				}
			} catch (err) {

			}
		})
	}
} catch (err) {

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
// 6 functions ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					


	function logAll(){
		connection.query('SELECT * FROM Users', function (error, results, fields) {
			if (error) throw error;
			console.log('All tables: ', results);
		});
	}

	function set(option) {
		connection.query(
			`UPDATE Users
			SET ${option} = ${args[2]}
			WHERE user_id = ${args[1]}`
			, function (error, results, fields) {
				if (error) serverInfo("error updating "+option+" of #"+args[1]);
			});
			serverInfo(option+" updated of user #"+args[1])
	}
// 5.1 End of cases ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
			}
			console.log('✅✅ - - - - - - - - FINISHED RECEIVING - - - - - - - -')
		socket.destroy()
	});

	socket.on('error', function(err) {
		socket.destroy()
	});
});

function serverInfo(info){
	console.log(">_< (receiving) " + info)
}

// 7 End of server ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
server.listen(port);
serverInfo("Started server on port: " + port)
// 7.1 End of file >_< ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					