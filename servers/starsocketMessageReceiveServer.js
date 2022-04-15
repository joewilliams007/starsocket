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


// 2 MySql COnnect to db_main------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
		

		 //-- Save Message         		
	//	 _messages.push(receivedMessage.toString())
	//	 fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))

		
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
// 4 about sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "aboutSportDash":
	
var about = `W H Λ T  I S  S P O R T D Λ S H ?

SportDash is an application owned by StarDash.inc

SportDash aims to help motivate everyone doing sports by comparing scores with friends. 
It also gives users the ability to create training plans and share them with their friends. 
Users can send messages to each others via the inbox

Everything in SportDash works via your StarDash account. 
You can find your user id associated with your StarDash account in the settings and on your main page. 
Friends can find your account via your id. 
You should also never forget your ID in order to log back in!

H O W  C Λ N  I  C O N T Λ C T  S U P P O R T ?

The best way is to send "feedback" in the app via SportDash/Settings/send-feedback

You can also contact us via our email: johannimus2004@gmail.com

P R I V Λ C Y

What can others see?

other users can view your ... via your user id

username
age
id
level
progress
weight
plans

What is stored on our servers? 

- - - - - 

n o t e : 

everything we store is for the users good only! 

for example we only store your plans for you to have a Backup when you log back in and for your friends to view them

no data is being sold and this will always stay that way

- - - - - 

After registering and agreeing to the terms and conditions, we store

all the entrys you give us, such as ...

username
age
weight
email

by using the app ...

training plans
xp
coins
progress
theme
styles
comments
last log in

when sending feedback/reports ...

when selected your hardware/software information
after your feedback/report is reviewed it will be deleted

an option to delete your account will follow soon!

>_< this page is stored on our server and was last updated: 10.04.22 19:37 (CEST)`

			//-- Save Message         		
			_messages.push(socket.remoteAddress+" "+about)
			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))

	
break;
// 4.0 changelog sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "changelog":
	
var about =

`newest version : 0.1
last updated : 10.04.2022

- - - a l l  u p d a t e s

version name : 0.1
version status : private
update :

[NEW] app base
[FIX] no fixes`
			
//-- Save Message         		
_messages.push(socket.remoteAddress+" "+about)
fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
	
break;
// 4.0 shop sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "shop":
	
var codeVersion = args[1]
if (Number(codeVersion)<1){
//-- Save Message         		
_messages.push(socket.remoteAddress+" outdated-app")
fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
} else {

var item1 = "-_-"
var desc1 ="s t e v e"
var coins1 = "20"
var id1 = "1" 

var item2 = "<_<"
var desc2 ="f r a n k"
var coins2 = "25"
var id2 = "2" 

var item3 = "~_~"
var desc3 ="h u a n"
var coins3 = "30"
var id3 = "3" 

var item4 = "1"
var desc4 ="l i g h t  b o x"
var coins4 = "100"
var id4 = "b1" 

var item5 = "2"
var desc5 ="g r e e n s t a r  b o x"
var coins5 = "200"
var id5 = "b2" 


function beforeMidnight(){
    var mid= new Date(), 
    ts= mid.getTime();
    mid.setHours(24, 0, 0, 0);
    return Math.floor((mid - ts)/60000);
}
  
var shop =

`${beforeMidnight()/60}h${beforeMidnight()}
${item1}!-${desc1}!-${coins1}!-${id1}
${item2}!-${desc2}!-${coins2}!-${id2}
${item3}!-${desc3}!-${coins3}!-${id3}
${item4}!-${desc4}!-${coins4}!-${id4}
${item5}!-${desc5}!-${coins5}!-${id5}`
			
	//-- Save Message         		
	_messages.push(socket.remoteAddress+" "+shop)
	fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
}
	
break;
// 4.0 terms of service sportdash ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "terms_of_service":
	
var about =

`P R I V Λ C Y

What can others see?

other users can view your ... via your user id

username
age
id
level
progress
weight
plans

What is stored on our servers? 

- - - - - 

n o t e : 

everything we store is for the users good only! 

for example we only store your plans for you to have a Backup when you log back in and for your friends to view them

no data is being sold and this will always stay that way

- - - - - 

After registering and agreeing to the terms and conditions, we store

all the entrys you give us, such as ...

username
age
weight
email

by using the app ...

training plans
xp
coins
progress
theme
styles
comments
last log in

when sending feedback/reports ...

when selected your hardware/software information
after your feedback/report is reviewed it will be deleted

an option to delete your account will follow soon!

>_< this page is stored on our server and was last updated: 10.04.22 19:37 (CEST)`
			
//-- Save Message         		
_messages.push(socket.remoteAddress+" "+about)
fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
	
break;
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
			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
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
			var res = JSON.parse(JSON.stringify(results)); // Stringify makes it easy to access
			id = res[0].user_id;

			//-- Save Message         		
			_messages.push(socket.remoteAddress+" "+args[1]+" "+id)
			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))


			var dir = "./users/"+id

			if (!fs.existsSync(dir)){
				fs.mkdirSync(dir, { recursive: true });
			}

			fs.appendFile('./users/'+id+'/log.txt', '', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });
			  fs.appendFile('./users/'+id+'/inbox.txt', '', function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });
			  fs.appendFile('./users/'+id+'/chatinbox.txt', '', function (err) {
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

			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
			serverInfo('Hey this user got the user_id ', args[1]);
} catch (err) {
	_messages.push(socket.remoteAddress+" err")
	fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
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

			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
			serverInfo('Hey this user got the user_id ', args[1]);
} catch (err) {
	_messages.push(socket.remoteAddress+" err")
	fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
	serverInfo('error ', args[1]);
}
			
		});
break;
// 4.2.x send message ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "chat":
	var FROM = args[1]
	var to =  args[2]
	var username = message.toString().split("MESSAGE&")[2]
	var datetime = new Date();
	var date = datetime.toISOString().slice(0,10)
	var time1 = datetime.toLocaleTimeString().split(":");
	var time2 = datetime.toLocaleTimeString().split(" ");
	var time = time1[0]+":"+time1[1]+" "+time2[1]
	var chatM = message.toString().split("MESSAGE&")[1]
	var finalMessage = "- - - - -\n"+date+" "+time+" by user #"+FROM+"\n- "+chatM
	var finalMessageChat = time+"@"+username+"@"+chatM+"NEXTMESSAGEIS:;"

	serverInfo(finalMessage)

	try{
	fs.appendFile("./users/"+to+"/chatinbox.txt","\n"+finalMessage, function (err) {
		if (err) {
			// append failed
		} else {
			// done
		}
		})

		var dir = "./chat/"+to;
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir, { recursive: true });
		}
		var dir = "./chat/"+FROM;
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir, { recursive: true });
		}

		fs.appendFile("./chat/"+to+"/"+FROM+".txt","\n"+finalMessageChat, function (err) {
		if (err) {} else {}
		})
		fs.appendFile("./chat/"+FROM+"/"+to+".txt","\n"+finalMessageChat, function (err) {
		if (err) {} else {}
		})

	serverInfo("saving message to #"+to+" from "+FROM)
}catch (err){

}
break;
// 4.2.x.x get chat ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getChat":
	var userid = args[1]
	var chatId = args[2]
try{
	var chat = fs.readFileSync("./chat/"+userid+"/"+chatId+".txt");
	


	_messages.push(socket.remoteAddress+" "+chat)
	fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))

}catch (err){

}
break;
// 4.2.x clear chat ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "clearChat":
	var userid = args[1]
	var chatId = args[2]

	fs.unlinkSync("./chat/"+userid+"/"+chatId+".txt")
	fs.appendFile("./chat/"+userid+"/"+chatId+".txt", '', function (err) {
		if (err) throw err;
		console.log('cleared chat');
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
// 4.2.x.x get inbox ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "mychatinbox":
	var userid = args[1]
try {
	var comments = fs.readFileSync("./users/"+userid+"/chatinbox.txt");
	_messages.push(socket.remoteAddress+" "+comments)
	fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
} catch (err){
	
}
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
	
				//	console.log(res)

					var leaderboard = "";
					var position = 0
					
					for (const item of res.values()) {  

						if (Number(JSON.stringify(item.xp))<1){

						} else {
							
						position++
								//	console.log(`Cache item: ${JSON.stringify(item)}`)
								if (position<2){
									leaderboard+=JSON.stringify(item.xp)+"xp "+JSON.stringify(item.username)+" #"+JSON.stringify(item.user_id)
								} else if (position<4){
									leaderboard+="\n"+JSON.stringify(item.xp)+"xp "+JSON.stringify(item.username)+" #"+JSON.stringify(item.user_id)
								} else if (position>100){
								} else {
									leaderboard+="\n "+position+". "+JSON.stringify(item.xp)+"xp "+JSON.stringify(item.username)+" #"+JSON.stringify(item.user_id)
								}
						}
					}

					console.log(leaderboard)
					_messages.push(socket.remoteAddress+" "+leaderboard)
					fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
			
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

			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
			serverInfo('Hey this user got the user_id ', args[1]);
		} catch (err) {
			_messages.push(socket.remoteAddress+" err")
			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
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

			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
			serverInfo('Hey this user got the user_id ', args[1]);
		} catch (err) {
			_messages.push(socket.remoteAddress+" errasdasdasdasdasdasdasdasd")
			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
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

	var finalMessageChat = time+" "+date+"@"+username+" #"+userid+"@"+comment+"NEXTMESSAGEIS:;"

	fs.appendFile('plans/comments/'+planid+'.txt', "\n"+finalMessage, function (err) {
	if (err) {
		// append failed
	} else {
		// done
	}
	})
break;
// 4.12.. get plan stars ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
case "getStars":
	var planid = args[1]

	var stars = fs.readFileSync('plans/stars/'+planid+'.txt');
	var message = stars.toString().split('#').length-1;
	
	
	//-- Save Message         		
			_messages.push(socket.remoteAddress+" "+message)

			fs.writeFileSync("./user_messages/"+ip+"/messages.json", JSON.stringify(_messages))
	

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


