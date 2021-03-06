// >_< server index ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// server index ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// create directories
let fs = require('fs');
var dir = './plans/allplans';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, { recursive: true });
}
var dir = './plans/allplansonline';
if (!fs.existsSync(dir)) {
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
const notifications = require("../plugins/online/notifications.js")
const starsPage = require("../plugins/online/starsPage.js")
const planStarsPage = require("../plugins/online/planStarsPage.js")
const futureLogApp = require("../plugins/sportdash/futureLogApp.js")
const downloadPlans = require("../plugins/plans/downloadPlans.js")
const getChatMessages = require("../plugins/online/getChatMessages.js")
const feed = require("../plugins/online/feed.js")
const profile = require("../plugins/online/profile.js")
const searchUser = require("../plugins/online/searchUser.js")
const clearChatMessages = require("../plugins/online/clearChatMessages.js")
const register = require("../plugins/online/account/register.js")
const login = require("../plugins/online/account/login.js")
const accountActivity = require("../plugins/online/account/accountActivity.js")
const downloadComments = require("../plugins/plans/comments/downloadComments.js")

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
	host: 'localhost',
	user: 'root',
	password: 'johannw2004',
	database: 'db_main',
	charset: 'utf8mb4'
});
connection.connect();
// Server ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Server Ports------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var port = 2224;
var server = net.createServer();
// StartServer ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var server = net.createServer(function (socket) {

	var receivedMessage = ""
	var ip = socket.remoteAddress

	connection.query( // register userstuff
		`INSERT IGNORE INTO Ip (ip, reply, requests, banned) 
	VALUES ("${ip}"," ",0,false)`
		, function (error, results, fields) {
			if (error) throw error;
		});


	socket.on('data', function (chunk) {
		//serverInfo(`receiving message chunk...`)
		receivedMessage += chunk.toString()
	});

	socket.on('end', function () {
		var today = new Date();
		var yyyy = today.getFullYear();
		let mm = today.getMonth() + 1; // Months start at 0!
		let dd = today.getDate();
		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
		var date = yyyy + '-' + mm + '-' + dd;

		var messageSec = receivedMessage.toString();
		var message = messageSec.split("??")[1];
		var user_id;
		try {
			user_id = messageSec.split(" ")[0];
		} catch (err) {
			user_id = "0";
		}
		var password = messageSec.split(" ")[1];
		var username = messageSec.split(" ")[2];


		if (receivedMessage.length > 0) {
			serverInfo('\n-------------------------\nIP ' + ip + "\nSIZE " + receivedMessage.length.toString() + "\nMESSAGE " + receivedMessage + "\nUSERNAME " + username + "\nID " + user_id + "\n-------------------------\n");
		}

		var args;
		try {
			args = message.split(" ");
			if (args[0].length < 1) {
				args[0] = "none";
			}
		} catch (err) {
			args = "no case".split(" ")
		}


		switch (args[0]) {
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
				/*	console.log(decryptedString); // bacon
				
				var nodemailer = require('nodemailer');
				
				var transporter = nodemailer.createTransport({
				  service: 'gmail',
				  auth: {
					user: 'sportdash.inc@gmail.com',
					pass: 'mitoladash'
				  }
				});
				
				var mailOptions = {
				  from: 'sportdash@gmail.com',
				  to: `${args[3]}`,
				  subject: 'SportDash',
				  text: 'Thank you for registering a StarDash Account!'
				};
				
				transporter.sendMail(mailOptions, function(error, info){
				  if (error) {
					console.log(error);
				  } else {
					console.log('Email sent: ' + info.response);
				  }
				}); */

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

								var res = JSON.parse(JSON.stringify(results))
								var id = res[0].user_id;


								detectLogin("true", id)
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
							detectLogin("false", args[1])
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
											`SELECT COUNT(*) AS RowCount FROM Stars WHERE user_id ='${args[1]}'`

											, function (error, resultsStars, fields) {


												connection.query(
													`SELECT COUNT(*) AS RowCount FROM Plans WHERE creator_id ='${args[1]}'`

													, function (error, resultsPlans, fields) {


														reply(profile(message, results, f1, f2, resultsStars[0].RowCount, resultsPlans[0].RowCount))
													});
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
			// starsPage ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "plansPage":

				connection.query( // get the users stuff
					`SELECT * FROM Plans
	WHERE creator_id="${args[1]}";`
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
						if (JSON.parse(JSON.stringify(results))[0] == undefined) {

							connection.query(

								`INSERT INTO Follow  (follower_id, target_id, follower_name, target_name) 
				VALUES ("${userid}","${targetid}","${username}","${target_username}")`

								, function (error, results, fields) {
									if (error) throw error;

									var dateInSec = Math.floor(new Date() / 1000) // in seconds
									connection.query(
										`INSERT INTO Notifications (user_id, from_id, viewed, date, type, notification_text,plan_id,from_name) 
				VALUES ("${targetid}", "${user_id}",false,${dateInSec},"follow"," ","-","${username}")`
										, function (error, results, fields) {
											if (error) throw error;
										});
								});

							reply("follow-added")
							serverInfo("subbed")
						} else {
							connection.query(

								`DELETE FROM Follow WHERE target_id="${targetid}" AND follower_id="${userid}";`

								, function (error, results, fields) {
									if (error) throw error;

									connection.query(
										`DELETE FROM Notifications 
					WHERE from_id="${user_id}" AND user_id ="${targetid}" AND type = "follow"`

										, function (error, results, fields) {
											if (error) throw error;
											console.log('Deleted notif! >_< ');
										});
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
						if (JSON.parse(JSON.stringify(results))[0] == undefined) {
							reply("not following")
						} else {
							reply("true")
						};
					});

				break;
			// send message ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "chat":
				var dateInSec = Math.floor(new Date() / 1000) // in seconds
				var FROM = user_id
				var FROM_NAME = username;
				var TO = args[1]
				var isReply = args[2]
				var text = message.split("TEXTMESSAGESP:")[1]

				if (text.length > 20000) {
					serverInfo("message is too long")
				} else {

					if (isReply == "reply") {
						var replyText = message.split("TEXTMESSAGESP:")[2]

						connection.query(
							`INSERT INTO Messages (to_id, from_id, from_name, text, type, viewed,edited,deleted,date) 
				VALUES ("${TO}", "${FROM}","${FROM_NAME}","${replyText + "TEXT=" + text}","reply",false,false,false,${dateInSec})`
							, function (error, results, fields) {
								if (error) throw error;

								connection.query(
									`INSERT INTO Notifications (user_id, from_id, viewed, date, type, notification_text,plan_id,from_name) 
						VALUES ("${TO}", "${FROM}",false,${dateInSec},"chat","has replied to your message"," ","${username}")`
									, function (error, results, fields) {
										if (error) throw error;

									});
							});
					} else {
						connection.query(
							`INSERT INTO Messages (to_id, from_id, from_name, text, type, viewed,edited,deleted,date) 
			VALUES ("${TO}", "${FROM}","${FROM_NAME}","${text}","text",false,false,false,${dateInSec})`
							, function (error, results, fields) {
								if (error) throw error;

								connection.query(
									`INSERT INTO Notifications (user_id, from_id, viewed, date, type, notification_text,plan_id,from_name) 
					VALUES ("${TO}", "${FROM}",false,${dateInSec},"chat","has sent you a text message"," ","${username}")`
									, function (error, results, fields) {
										if (error) throw error;

									});
							});
					}
				}

				break;
			// get chat ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "getChat":

				var FROM = user_id
				var TO = args[1]

				connection.query( // get the users stuff
					`SELECT * FROM Messages
				WHERE to_id="${FROM}"
				AND from_id = "${TO}"
				OR to_id="${TO}"
				AND from_id ="${FROM}"
				ORDER BY date DESC LIMIT 100`

					, function (error, results, fields) {
						if (error) serverInfo(error.message);
						reply(getChatMessages(results))

						connection.query(
							`UPDATE Messages
						SET viewed = true
						WHERE to_id = ${FROM}
						AND from_id = "${TO}"
						`
							, function (error, results, fields) {
								if (error) serverInfo("error updating ");
							});
					});
				break;
			// get chat ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "getChatInfo":
				var FROM = user_id
				var TO = args[1]

				connection.query(

					`SELECT COUNT(*) AS RowCount 
				FROM Messages
				WHERE to_id="${FROM}"
				AND from_id = "${TO}"
				AND deleted = false
				AND edited = false`

					, function (error, results1, fields) {
						if (error) serverInfo(error.message);

						connection.query(

							`SELECT COUNT(*) AS RowCount 
						FROM Messages
						WHERE to_id="${TO}"
						AND from_id = "${FROM}"
						AND deleted = false
						AND edited = false`

							, function (error, results2, fields) {
								if (error) serverInfo(error.message);

								total = Number(results1[0].RowCount) + Number(results2[0].RowCount)
								reply(total + " " + results1[0].RowCount + " " + results2[0].RowCount)
							});
					});



				break;
			// delete Message ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "deleteMessage":

				connection.query(
					`UPDATE Messages
		SET deleted = true
		WHERE message_id = ${args[1]}
		AND from_id = "${user_id}"
		`
					, function (error, results, fields) {
						if (error) serverInfo("error updating ");

						var dateInSec = Math.floor(new Date() / 1000) // in seconds
						var FROM = user_id
						var FROM_NAME = username;
						var TO = args[2]
						var text = message.split("TEXTMESSAGESP:")[1]

						if (text.length > 20000) {
							serverInfo("message is too long")
						} else {
							connection.query(
								`INSERT INTO Messages (to_id, from_id, from_name, text, type, viewed,edited,deleted,date) 
					VALUES ("${TO}", "${FROM}","${FROM_NAME}","${text}","text",false,false,false,${dateInSec})`
								, function (error, results, fields) {
									if (error) throw error;


								});
						}


					});

				break;
			// edit Message ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "editMessage":

				connection.query(
					`UPDATE Messages
		SET edited = true, text = "${message.split("editedMessage")[1]}"
		WHERE message_id = ${args[1]}
		AND from_id = "${user_id}"
		`
					, function (error, results, fields) {
						if (error) serverInfo("error updating ");

						var dateInSec = Math.floor(new Date() / 1000) // in seconds
						var FROM = user_id
						var FROM_NAME = username;
						var TO = args[2]
						var text = message.split("TEXTMESSAGESP:")[1]

						if (text.length > 20000) {
							serverInfo("message is too long")
						} else {
							connection.query(
								`INSERT INTO Messages (to_id, from_id, from_name, text, type, viewed,edited,deleted,date) 
					VALUES ("${TO}", "${FROM}","${FROM_NAME}","${text}","text",false,false,false,${dateInSec})`
								, function (error, results, fields) {
									if (error) throw error;

								});
						}


					});

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
			// get notification inbox ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "notifications":

				var type;
				if (args[1] == "chats") {
					type = "chat"
				} else if (args[1] == "follows") {
					type = "follow"
				} else if (args[1] == "comments") {
					type = "comment"
				} else if (args[1] == "stars") {
					type = "star"
				}

				if (args[1] != "all") {
					connection.query( // get the users stuff
						`SELECT * FROM Notifications
				WHERE user_id="${user_id}"
				AND type = "${type}"
				ORDER BY date DESC LIMIT 100`

						, function (error, results, fields) {
							if (error) serverInfo(error.message);
							reply(notifications(results))
						});
				} else {
					connection.query( // get the users stuff
						`SELECT * FROM Notifications
		WHERE user_id="${user_id}"
		ORDER BY date DESC LIMIT 100`

						, function (error, results, fields) {
							if (error) serverInfo(error.message);
							reply(notifications(results))
						});
				}

				break;
			// view notification  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "viewNotification":
				var notif_id = args[1]
				connection.query( // get the users stuff
					`UPDATE Notifications
				SET viewed = 1
				WHERE notif_id = ${notif_id}`

					, function (error, results, fields) {
						if (error) serverInfo(error.message);
					});
				break;
			// view notification chat  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "viewNotificationChat":
				var from_id = args[1]
				connection.query( // get the users stuff
					`UPDATE Notifications
				SET viewed = 1
				WHERE from_id = ${from_id} AND user_id = ${user_id}`

					, function (error, results, fields) {
						if (error) serverInfo(error.message);
					});
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
						if (error) serverInfo("error updating " + option + " of #" + args[1]);
					});
				serverInfo(option + " updated of user #" + args[1])

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
				ORDER BY RAND() LIMIT 75`

					, function (error, results, fields) {
						if (error) serverInfo(error.message);
						reply(feed("all_time", results))
					});
				break;
			// feed fresh ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "feed_fresh":
				connection.query( // get the users stuff
					`SELECT * FROM Plans
				WHERE privacy=1
				ORDER BY date DESC LIMIT 75`

					, function (error, results, fields) {
						if (error) serverInfo(error.message);
						reply(feed("all_time", results))
					});
				break;
			// feed trending ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "feed_trending":
				connection.query( // get the users stuff
					`SELECT * FROM Plans
			WHERE privacy=1
			AND plan_stars>1
			ORDER BY RAND() LIMIT 75`

					, function (error, results, fields) {
						if (error) serverInfo(error.message);
						reply(feed("all_time", results))
					});
				break;
			// feed following ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "feed_following":

				connection.query( // get the users stuff
					`SELECT * FROM Follow
	WHERE follower_id="${args[1]}";`
					, function (error, res, fields) {
						if (error) { }

						var message = "";

						for (const item of JSON.parse(JSON.stringify(res)).values()) {
							message += JSON.stringify(item.target_id) + " OR creator_id=";
						}

						serverInfo(`SELECT * FROM Plans
		WHERE creator_id=${message}'NOPE'
		ORDER BY date DESC LIMIT 25`)

						connection.query( // get the users stuff
							`SELECT * FROM Plans
		WHERE creator_id=${message}'5'
		ORDER BY date DESC LIMIT 75`

							, function (error, results, fields) {
								if (error) serverInfo(error.message);
								reply(feed("all_time", results))
							});
					});
				break;
			// login activity ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "accountActivity":
				connection.query( // get the users stuff
					`SELECT * FROM Logins
			WHERE user_id ="${user_id}"
			ORDER BY date DESC`
					, function (error, results, fields) {
						if (error) serverInfo(error.message);
						reply(accountActivity(results))
					});
				break;
			// 4.11 upload plans ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "upload_plans":
				var changing = "plans"
				var planId = args[3];
				var data = message.split("##########")[1].replace("??", "A");
				var id = args[1];

				// upload to my account
				fs.unlink('users/' + id + '/plan' + args[2] + '.txt', function (err) {
					if (err) throw err;
					console.log('File deleted!');
				});
				fs.appendFile('users/' + id + '/plan' + args[2] + '.txt', data, function (err) {
					if (err) throw err;
				});
				// upload to all 
				fs.appendFile('plans/allplans/' + planId + '.txt', data, function (err) {
					if (err) throw err;
				});
				fs.appendFile('plans/comments/' + planId + '.txt', "\n", function (err) {
					if (err) throw err;
				});

				var db = message.split("##########");

				var dateInSec = Math.floor(new Date() / 1000) // in seconds
				connection.query( // register userstuff
					`INSERT INTO Plans (plan_name, plan_description, creator_name, creator_id,plan_id, duration, category, difficulty, reports, plan_usage, plan_stars,privacy,plan_views,date,plan) 
VALUES ("${db[2]}","${db[3]}","${db[4]}","${db[5]}","${planId}",${db[7]},"${db[8]}","${db[9]}",0,0,0,1,0,${dateInSec},"${data}")`
					, function (error, results, fields) {
						if (error) serverInfo("err");
					});

				serverInfo("uploading plan " + args[2] + " of user #" + args[1])
				break;
			// upload plans ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "upload_plans_everyone":
				var changing = "plans"

				var data = message.split("##########")[1].replace("??", "A");
				var tags = message.split("##########")[2] + ",";
				var id = args[1];
				var category = args[4].split("XXXXXXXX")[1];
				var planId = args[3];
				// upload to specific category
				var dir = './plans/' + category;

				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir, { recursive: true });
				}

				fs.appendFile('plans/' + category + '/' + planId + '.txt', data, function (err) {
					if (err) throw err;
				});
				// upload to all online
				fs.appendFile('plans/allplansonline/' + planId + '.txt', data, function (err) {
					if (err) throw err;
				});
				// upload to all 
				fs.appendFile('plans/allplans/' + planId + '.txt', data, function (err) {
					if (err) throw err;
				});
				fs.appendFile('plans/comments/' + planId + '.txt', "\n", function (err) {
					if (err) throw err;
				});


				exec("rm -rf ./plans/allplansonline/0.txt")
				// upload to users account
				fs.unlink('users/' + id + '/plan' + args[2] + '.txt', function (err) {
					if (err) throw err;
					console.log('File deleted!');
				});
				fs.appendFile('users/' + id + '/plan' + args[2] + '.txt', data, function (err) {
					if (err) throw err;
				});
				var db = message.split("##########");
				var dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds

				connection.query( // register userstuff
					`INSERT INTO Plans (plan_name, plan_description, creator_name, creator_id,plan_id, duration, category, difficulty, reports, plan_usage, plan_stars,privacy,plan_views,date, tags, plan) 
VALUES ("${db[2]}","${db[3]}","${db[4]}","${db[5]}","${planId}",${db[7]},"${db[8]}","${db[9]}",0,0,0,1,0,${dateInSec},"${tags}","${data}")`
					, function (error, results, fields) {
						if (error) throw error;
					});

				serverInfo("uploading plan " + args[2] + " of user #" + args[1])
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
				WHERE plan_id="${args[1].replace("#", "")}"`

					, function (error, results, fields) {
						if (error) serverInfo(error.message);
						reply(downloadComments(message, results))
					});
				break;
			// 4.12.2  comment on plan ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "commentPlan":
				var userid = args[2]
				var username = args[3]
				var planid = args[1].replace("#", "")
				var comment = message.split("THECOMMENTISSTAR")[1]

				var datetime = new Date();
				var date = datetime.toISOString().slice(0, 10)
				var time1 = datetime.toLocaleTimeString().split(":");
				var time2 = datetime.toLocaleTimeString().split(" ");
				var time = time1[0] + ":" + time1[1] + " " + time2[1]
				var finalMessageChat = time + " " + date + "@" + username + " #" + userid + "@" + comment + "NEXTMESSAGEIS:;"

				connection.query(
					`INSERT INTO Comments (creator_id, creator_name, plan_id, comment, date, reports, likes) 
	VALUES ("${userid}","${username}","${planid}","${comment}","${time} ${date}",0,0)`
					, function (error, results, fields) {
						if (error) throw error;

						var dateInSec = Math.floor(new Date() / 1000) // in seconds
						connection.query(
							`INSERT INTO Notifications (user_id, from_id, viewed, date, type, notification_text,plan_id,from_name) 
				VALUES ("${planid.split("-")[0]}", "${user_id}",false,${dateInSec},"comment"," ","${planid}","${username}")`
							, function (error, results, fields) {
								if (error) throw error;

							});
					});

				break;

			case "likeComment":


				var commentid = args[2]
				serverInfo("id issss " + commentid)
				var userid = args[1]
				var comm = ""

				try {
					comm = fs.readFileSync('plans/comments/' + commentid + '.txt');
				} catch (err) {
					fs.appendFile('plans/comments/' + commentid + '.txt', " ", function (err) {
						if (err) {
							// append failed
						} else {
							comm = fs.readFileSync('plans/comments/' + commentid + '.txt');
						}
					})
				}

				if (comm.includes(userid)) {
					try {


						amount = fs.readFileSync('plans/comments/' + commentid + '.txt').toString().split('#').length - 1;
						serverInfo("amount i s  " + amount)
						connection.query(
							`UPDATE Comments
					SET likes = "${amount}"
					WHERE comment_id = ${commentid}`
							, function (error, results, fields) {
								if (error) throw serverInfo(error);
							});



						var replace = require('replace-in-file');
						var options = {

							files: 'plans/comments/' + commentid + '.txt',
							from: "#" + userid,
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

					fs.appendFile('plans/comments/' + commentid + '.txt', "#" + userid, function (err) {
						if (err) {
							// append failed
						} else {
							// done
						}
					})

					amount = ""


					try {
						amount = fs.readFileSync('plans/comments/' + commentid + '.txt').toString().split('#').length - 1;
					} catch (err) {
						fs.appendFile('plans/comments/' + commentid + '.txt', "", function (err) {
							if (err) {
								// append failed
							} else {
								amount = fs.readFileSync('plans/comments/' + commentid + '.txt').toString().split('#').length;
							}
						})
					}




					serverInfo("amount i s  " + amount)
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

										serverInfo("stars are " + results[0].RowCount)
										serverInfo("views are " + results1[0].RowCount)
										serverInfo("ur stared status is " + results2[0].RowCount)

										reply(results[0].RowCount + "#" + results1[0].RowCount + "#" + results2[0].RowCount)


										serverInfo("updating views " + args[1])
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
				var userid = "+#" + args[1] + "+"
				var planid = args[2]
				var planname = message.split("%%%")[1]
				var stars = "none"

				connection.query(

					`SELECT * FROM Stars WHERE user_id ='${user_id}' AND plan_id ='${planid}'`

					, function (error, results, fields) {
						if (results.length < 1) {

							connection.query(
								`INSERT INTO Stars (user_id, plan_id, username, plan_name) 
					VALUES ("${user_id}","${planid}","${username}","${planname}")`
								, function (error, results, fields) {
									if (error) throw error;
									console.log(' ------------------ Yey new star! >_< ');
									reply("star-added")

									var dateInSec = Math.floor(new Date() / 1000) // in seconds
									connection.query(
										`INSERT INTO Notifications (user_id, from_id, viewed, date, type, notification_text,plan_id,from_name) 
						VALUES ("${planid.split("-")[0]}", "${user_id}",false,${dateInSec},"star"," ","${planid}","${username}")`
										, function (error, results, fields) {
											if (error) throw error;
										});
								});

						} else {

							connection.query(
								`DELETE FROM Stars WHERE user_id ='${user_id}' AND plan_id ='${planid}'`
								, function (error, results, fields) {
									if (error) throw error;
									console.log(' ------------------ Star removed! >_< ');
									reply("star-removed")

									connection.query(
										`DELETE FROM Notifications 
						WHERE from_id="${user_id}" AND plan_id ="${planid}" AND type = "star"`

										, function (error, results, fields) {
											if (error) throw error;
											console.log('Deleted notif! >_< ');
										});
								});

						};
					});

				break;
			// 4.12.2 clear comments ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			case "clearComments":
				var planid = args[1]
				fs.unlinkSync('plans/comments/' + planid + '.txt')
				fs.appendFile('plans/comments/' + planid + '.txt', '\n', function (err) {
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
				var date = datetime.toISOString().slice(0, 10)
				var time = datetime.toLocaleTimeString();
				var chatM = message.toString().split("MESSAGE&")[1]
				var finalMessage = "- - - - -\n" + date + " " + time + " \n- you submitted a feedback/report!"

				try {
					_feedback.push(message.replace("feedback 14", "\n\n"))
					fs.writeFileSync('./feedback.json', JSON.stringify(_feedback))
				} catch (err) {

				}
				serverInfo("RECEIVED FEEDBACK!!!!!\n" + message)


				serverInfo(finalMessage)
				try {

					fs.appendFile("./users/" + to + "/chatinbox.txt", "\n" + finalMessage, function (err) {
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


				_messages.push(socket.remoteAddress + " " + _feedback.toString())
				fs.writeFileSync("./user_messages/" + ip + "/messages.json", JSON.stringify(_messages))

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
				// reply --------------------------------------------------------------------------iIi---------------------------------------------------------------------------------------------------------------------
				function reply(message) {
					connection.query(
						`UPDATE Ip
				SET reply = '${receivedMessage + "ThiIsTheAnswer" + message}',
				requests = requests + 1,
				user_id = "${user_id}"
				WHERE ip = "${ip}"`
						, function (error, results, fields) {
							if (error) serverInfo(error);
						});
				}
				// 6 functions ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
				function logAll() {
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
							if (error) serverInfo("error updating " + option + " of #" + args[1]);
						});
					serverInfo(option + " updated of user #" + args[1])
				}
				String.prototype.replaceAll = function (search, replacement) {
					var target = this;
					return target.replace(new RegExp(search, 'g'), replacement);
				};



				async function detectLogin(signup, id) {

					String.prototype.replaceAll = function (search, replacement) {
						var target = this;
						return target.replace(new RegExp(search, 'g'), replacement);
					};

					var dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds
					var cleanIp = ip.replaceAll("f", "").replaceAll(":", "")
					serverInfo(cleanIp)

					const iplocate = require('node-iplocate');


					iplocate(cleanIp).then(function (results) {
						console.log("IP Address: " + results.ip);
						console.log("Country: " + results.country + " (" + results.country_code + ")");
						console.log("Continent: " + results.continent);
						console.log("Organisation: " + results.org + " (" + results.asn + ")");
						console.log(JSON.stringify(results, null, 2));

						var country = results.country
						var country_code = results.country_code
						var continent = results.continent
						var city = results.city
						var latitude = results.latitude
						var longitude = results.longitude
						var org = results.org
						var asn = results.asn


						connection.query(
							`INSERT INTO Logins (ip, ip_remote, user_id, date, country, country_code, continent, city, latitude, longitude, org, asn, signup) 
		VALUES ("${cleanIp}","${ip}",${id},${dateInSec},"${country}","${country_code}","${continent}","${city}","${latitude}","${longitude}","${org}","${asn}",${signup})`
							, function (error, results, fields) {
								if (error) throw error;
								console.log('Saved new login detected! >_< ');
							});
					});
				}
			// 5.1 End of cases ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
		}
		socket.destroy()
	});

	socket.on('error', function (err) {
		socket.destroy()
	});
});

function serverInfo(info) {

	var d = new Date()

	console.log(" \n" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " >_< (receiving) " + info)
}

// 7 End of server ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					
server.listen(port);
serverInfo("Started server on port: " + port)
// 7.1 End of file >_< ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------					