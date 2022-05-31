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

const searchElement = require("../plugins/plans/searchElement.js") 
const aboutSportdash = require("../plugins/sportdash/about.js") 
const termsOfService = require("../plugins/sportdash/termsOfService.js") 
const shop = require("../plugins/sportdash/shop.js") 
const changelogApp = require("../plugins/sportdash/changelog.js") 
const leaderboard = require("../plugins/sportdash/leaderboard.js") 
const sendChatMessage = require("../plugins/online/chat.js") 
const followers = require("../plugins/online/followers.js") 
const follows = require("../plugins/online/following.js") 
const starsPage = require("../plugins/online/starsPage.js") 
const planStarsPage = require("../plugins/online/planStarsPage.js") 
const boost = require("../plugins/sportdash/boost.js") 
const futureLogApp = require("../plugins/sportdash/futureLogApp.js") 
const downloadPlans = require("../plugins/plans/downloadPlans.js") 
const downloadPlanById = require("../plugins/plans/downloadPlanById.js") 
const getChatMessages = require("../plugins/online/getChatMessages.js") 
const feed = require("../plugins/online/feed.js") 
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
database : 'db_main',
charset : 'utf8mb4'
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

	connection.query( // register userstuff
	`INSERT IGNORE INTO Ip (ip, reply, requests, banned) 
	VALUES ("${ip}"," ",0,false)`
	, function (error, results, fields) {
		if (error) throw error;
		console.log('Yey a new ip! >_< ');
	});


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
		try {
			if (args[0].length<1){
				args[0] = "none";
			}
		} catch (err){
			args = "no case".split(" ")
		}

			
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

					connection.query( // get the users id
					`SELECT user_id FROM Users
					WHERE username="${args[1]}" AND password = "${encryptedPassword}" AND email= "${args[3]}"`
					, function (error, results, fields) {
						if (error) serverInfo(error.message);
						reply(register(message, results))
					});

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

					connection.query( // get the users stuff
					`SELECT * FROM Follow
					WHERE follower_id="${args[1]}"`
			
					, function (error, followers, fields) {
						if (error) serverInfo(error.message);

							connection.query( // get the users stuff
							`SELECT * FROM Follow
							WHERE target_id="${args[1]}"`
					
							, function (error, follows, fields) {
								if (error) serverInfo(error.message);

								

								f1 = "";
								try {
									f1 = JSON.parse(JSON.stringify(followers)).length
								} catch (err) {
									f1 = 0
								}

								f2 = "";
								try {
									f2 = JSON.parse(JSON.stringify(follows)).length
								} catch (err) {
									f2 = 0
								}

								connection.query( 
									`SELECT COUNT(*) AS RowCount FROM Stars WHERE user_id ='${user_id}'`
				
									, function (error, resultsStars, fields) {
								
									
										reply(profile(message, results, f1, f2, resultsStars[0].RowCount))		
								});
				});	
			});
		});
break;
// followers ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "followersPage":

	connection.query( // get the users stuff
	`SELECT * FROM Follow
	WHERE target_id="${args[1]}";`
	, function (error, results, fields) {
		if (error) { }
		reply(followers(JSON.parse(JSON.stringify(results))))
	});

break;
// follows ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "followsPage":

	connection.query( // get the users stuff
	`SELECT * FROM Follow
	WHERE follower_id="${args[1]}";`
	, function (error, results, fields) {
		if (error) { }
		reply(follows(JSON.parse(JSON.stringify(results))))
	});

break;
// starsPage ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "starsPage":

	connection.query( // get the users stuff
	`SELECT * FROM Stars
	WHERE user_id="${args[1]}";`
	, function (error, results, fields) {
		if (error) { }
		reply(starsPage(JSON.parse(JSON.stringify(results))))
	});
break;
// planStarsPage ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "plansStarsPage":

	connection.query( // get the users stuff
	`SELECT * FROM Stars
	WHERE plan_id="${args[1]}";`
	, function (error, results, fields) {
		if (error) { }
		reply(planStarsPage(JSON.parse(JSON.stringify(results))))
	});
break;
// follow/unfollow ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "follow":
	var userid = args[1] // source
	var targetid = args[2] // target id
	var target_username = args[4]


	connection.query( // get the users stuff
	`SELECT * FROM Follow
	WHERE target_id="${targetid}" AND follower_id="${userid}"`

	, function (error, results, fields) {
		if (error) { }
		if (JSON.parse(JSON.stringify(results))[0]==undefined) { 

			connection.query( 

				`INSERT INTO Follow  (follower_id, target_id, follower_name, target_name) 
				VALUES ("${userid}","${targetid}","${username}","${target_username}")`

				, function (error, results, fields) {
				if (error) throw error;
			});

			reply("follow-added")
			serverInfo("subbed")
		} else {
			connection.query( 

				`DELETE FROM Follow WHERE target_id="${targetid}" AND follower_id="${userid}";`

				, function (error, results, fields) {
				if (error) throw error;
			});
		
			serverInfo("unsubbed")
			reply("follow-removed")
		};
	});	

break;
// check Follow ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "checkFollow":
	var userid = args[1] // source
	var targetid = args[2] // target id


	connection.query( // get the users stuff
	`SELECT * FROM Follow
	WHERE target_id="${targetid}" AND follower_id="${userid}"`

	, function (error, results, fields) {
		if (error) { }
		if (JSON.parse(JSON.stringify(results))[0]==undefined) { 

			reply("not following")
			serverInfo("following = false")
		} else {
		
			reply("true")
			serverInfo("following = true")
			
		};
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
	
var option = "password"
	var encryptedPassword = cryptr.encrypt(args[2]);
	connection.query(
		`UPDATE Users
		SET password = "${encryptedPassword}"
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
// set bio ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "setBio":

	connection.query(
		`UPDATE Users
		SET bio = "${message.split("BIO_IS_THE_FOLLOWING")[1]}"
		WHERE user_id = ${args[1]}`
		, function (error, results, fields) {
			if (error) throw error// serverInfo("error updating "+" of #"+args[1]);
		});
	
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
	set("username")	
break;
// feed all time ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "all_time":
		connection.query( // get the users stuff
				`SELECT * FROM Plans
				WHERE privacy=1
				ORDER BY RAND() LIMIT 25`
		
				, function (error, results, fields) {
					if (error) serverInfo(error.message);
					reply(feed("all_time",results))		
		});
break;
// feed fresh ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "feed_fresh":
		connection.query( // get the users stuff
				`SELECT * FROM Plans
				WHERE privacy=1
				ORDER BY date DESC LIMIT 25`
		
				, function (error, results, fields) {
					if (error) serverInfo(error.message);
					reply(feed("all_time",results))		
		});
break;
// feed following ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "feed_following":

	connection.query( // get the users stuff
	`SELECT * FROM Follow
	WHERE follower_id="${args[1]}";`
	, function (error, res, fields) {
		if (error) { }

		var message="";
					
		for (const item of JSON.parse(JSON.stringify(res)).values()) {  
				message+=JSON.stringify(item.target_id)+" OR creator_id=";
		}
		
		serverInfo(		`SELECT * FROM Plans
		WHERE creator_id=${message}'NOPE'
		ORDER BY date DESC LIMIT 25`)

		connection.query( // get the users stuff
		`SELECT * FROM Plans
		WHERE creator_id=${message}'5'
		ORDER BY date DESC LIMIT 25`

		, function (error, results, fields) {
			if (error) serverInfo(error.message);
			reply(feed("all_time",results))		
		});


	});



	
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
`INSERT INTO Plans (plan_name, plan_description, creator_name, creator_id,plan_id, duration, category, difficulty, reports, plan_usage, plan_stars,privacy,plan_views,date,plan) 
VALUES ("${db[2]}","${db[3]}","${db[4]}","${db[5]}","${planId}",${db[7]},"${db[8]}","${db[9]}",0,0,0,1,0,${dateInSec},"${data}")`
, function (error, results, fields) {
	if (error) throw error;
});

	serverInfo("uploading plan "+args[2]+" of user #"+args[1])
break;
// upload plans ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "upload_plans_everyone":
var changing = "plans"

var data = message.split("##########")[1].replace("Λ","A");
var tags = message.split("##########")[2]+",";
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
var dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds

connection.query( // register userstuff
`INSERT INTO Plans (plan_name, plan_description, creator_name, creator_id,plan_id, duration, category, difficulty, reports, plan_usage, plan_stars,privacy,plan_views,date, tags, plan) 
VALUES ("${db[2]}","${db[3]}","${db[4]}","${db[5]}","${planId}",${db[7]},"${db[8]}","${db[9]}",0,0,0,1,0,${dateInSec},"${tags}","${data}")`
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

	connection.query( 
		`SELECT * FROM Plans WHERE plan_id ='${args[1]}'`

		, function (error, results, fields) {
	
			reply(results[0].plan)		
	});

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

	connection.query( 
`INSERT INTO Comments (creator_id, creator_name, plan_id, comment, date, reports, likes) 
VALUES ("${userid}","${username}","${planid}","${comment}","${time} ${date}",0,0)`
, function (error, results, fields) {
	if (error) throw error;
});

break;

case "likeComment" :
	

		var commentid = args[2]
		serverInfo("id issss "+commentid )
		var userid = args[1]
		var comm = ""

		try {
			comm = fs.readFileSync('plans/comments/'+commentid+'.txt');
		} catch (err) { 
			fs.appendFile('plans/comments/'+commentid+'.txt', " ", function (err) {
				if (err) {
					// append failed
				} else {
					comm = fs.readFileSync('plans/comments/'+commentid+'.txt');
				}
				})
		}
		
		if (comm.includes(userid)){
				try {
		
	
				amount = fs.readFileSync('plans/comments/'+commentid+'.txt').toString().split('#').length-1;
				serverInfo("amount i s  "+amount)
				connection.query(
					`UPDATE Comments
					SET likes = "${amount}"
					WHERE comment_id = ${commentid}`
					, function (error, results, fields) {
						if (error) throw serverInfo(error);
					});
		
					
				
				var replace = require('replace-in-file');
				var options = {
		
					files: 'plans/comments/'+commentid+'.txt',
					from: "#"+userid,
					to: ' ',
				  };
		
				  replace(options)
				  .then(changedFiles => {
					console.log('Modified files:', changedFiles.join(', '));
				  })
				  .catch(error => {
					console.error('Error occurred:', error);
				  });
				  stars = "none"
			} catch (err) { }
		} else {
		
			fs.appendFile('plans/comments/'+commentid+'.txt', "#"+userid, function (err) {
				if (err) {
					// append failed
				} else {
					// done
				}
				})

				amount = ""


				try {
					amount = fs.readFileSync('plans/comments/'+commentid+'.txt').toString().split('#').length-1;
				} catch (err) { 
					fs.appendFile('plans/comments/'+commentid+'.txt', "", function (err) {
						if (err) {
							// append failed
						} else {
							amount = fs.readFileSync('plans/comments/'+commentid+'.txt').toString().split('#').length;
						}
						})
				}




				serverInfo("amount i s  "+amount)
				connection.query(
					`UPDATE Comments
					SET likes = "${amount}"
					WHERE comment_id = ${commentid}`
					, function (error, results, fields) {
						if (error) throw serverInfo(error);
					});

		}

break;
// get plan stars ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getStars": // (and views)


connection.query(

`SELECT COUNT(*) AS RowCount FROM Views WHERE user_id ='${user_id}' AND plan_id ='${args[1]}'`

, function (error, resultsV, fields) {
	
	if (resultsV[0].RowCount == "0") { 

		connection.query( 
			`INSERT INTO Views (user_id, plan_id, username) 
			VALUES ("${user_id}","${args[1]}","${username}")`
			, function (error, results, fields) {
				if (error) throw error;
				console.log('Yey new view! >_< ');
		});

	} else {
		serverInfo("already viewed plan before")
	};
	serverInfo(resultsV[0].RowCount)
});

	connection.query( 
	`SELECT COUNT(*) AS RowCount FROM Stars WHERE plan_id ='${args[1]}'`
	
	, function (error, results, fields) {

		connection.query( 
			`SELECT COUNT(*) AS RowCount FROM Views WHERE plan_id ='${args[1]}'`
			
			, function (error, results1, fields) {
		
				connection.query( 
					`SELECT COUNT(*) AS RowCount FROM Stars WHERE plan_id ='${args[1]}' AND user_id ='${user_id}'`

					, function (error, results2, fields) {
				
						serverInfo("stars are "+results[0].RowCount)
						serverInfo("views are "+results1[0].RowCount)
						serverInfo("ur stared status is "+results2[0].RowCount)
		
						reply(results[0].RowCount+"#"+results1[0].RowCount+"#"+results2[0].RowCount)

				
							serverInfo("updating views "+args[1])
							connection.query(
								`UPDATE Plans
								SET plan_views = ${results1[0].RowCount}
								WHERE plan_id = "${args[1]}"`
								, function (error, results, fields) {	
								
							});

							
								serverInfo("updating stars")
								connection.query(
									`UPDATE Plans
									SET plan_stars = ${results[0].RowCount}
									WHERE plan_id = "${args[1]}"`
									, function (error, results, fields) {	
								});
							
						
		
					});
			});
	});
break;
// 4.12..  star on plan ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "starPlan":
	var userid = "+#"+args[1]+"+"
	var planid = args[2]
	var planname = message.split("%%%")[1]
	var stars = "none"

	connection.query(

		`SELECT * FROM Stars WHERE user_id ='${user_id}' AND plan_id ='${planid}'`
	
		, function (error, results, fields) {
			if (results.length<1) { 
	
				connection.query( 
					`INSERT INTO Stars (user_id, plan_id, username, plan_name) 
					VALUES ("${user_id}","${planid}","${username}","${planname}")`
					, function (error, results, fields) {
						if (error) throw error;
						console.log(' ------------------ Yey new star! >_< ');
						reply("star-added")
				});
	
			} else {

				connection.query( 
					`DELETE FROM Stars WHERE user_id ='${user_id}' AND plan_id ='${planid}'`
					, function (error, results, fields) {
						if (error) throw error;
						console.log(' ------------------ Star removed! >_< ');
						reply("star-removed")
				}); 
	
			};
		});

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

connection.query( // get the users stuff
`SELECT * FROM Plans
WHERE privacy=1
ORDER BY RAND() LIMIT 1`

, function (error, results, fields) {
	if (error) serverInfo(error.message);

	reply(results[0].plan)		
});

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
		try {
			_messages.push(socket.remoteAddress+" "+message)
			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
		} catch (err){
			try {
				fs.unlinkSync("./user_messages/"+ip+"/messages.json")
				fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
					if (err) throw err;
					console.log('new messages created!');
					try {
					_messages = JSON.parse(fs.readFileSync("./user_messages/"+ip+"/messages.json"));
				} catch (err){
					fs.unlinkSync("./user_messages/"+ip+"/messages.json")
					fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
						if (err) throw err;
					})
				}
				
				});

				_messages.push(socket.remoteAddress+" "+message)
				fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))  
				} catch (err){
		
				}	
		}
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

var d = new Date()     

	console.log(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" >_< (receiving) " + info)
}

// 7 End of server ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
server.listen(port);
serverInfo("Started server on port: " + port)
// 7.1 End of file >_< ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					