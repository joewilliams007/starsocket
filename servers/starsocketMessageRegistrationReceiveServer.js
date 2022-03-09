// Dependecies ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var net = require('net');
let fs = require('fs');
const { exec } = require('child_process');
const _status = JSON.parse(fs.readFileSync('status.json'));
var port = 2227;
var server = net.createServer();
var server = net.createServer(function(socket) {
// Start Server ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
// ALL FUNCTIONS ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Start registration ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		if (receivedMessage.includes("registration")) {
			
			var data = receivedMessage.split(' ');
			var username = data[1]
			var email = data[2]
			var password = data[3]

			makeAccount(email, username, password)
// Login ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		} else if (receivedMessage.includes("login")) {

			var data = receivedMessage.split(' ');
			var email = data[1]
			var password = data[2]
			
			const dir = `./users/${email}/email.json`;
			// check if directory exists
			if (fs.existsSync(dir)) {
				console.log('Directory exists!');
				console.log("Correct Email")

				try {
					var _pass = JSON.parse(fs.readFileSync(`./users/${email}/password.json`));	
					var pass = _pass[0]	//--- Password
					var _username = JSON.parse(fs.readFileSync(`./users/${email}/username.json`));	
					var username = _username[0]	//--- username
					var _xp = JSON.parse(fs.readFileSync(`./users/${email}/xp.json`));	
					var xp = _xp[0]	//--- xp
					var _money = JSON.parse(fs.readFileSync(`./users/${email}/money.json`));	
					var money = _money[0]	//--- money

					_status.push("success "+username+" "+pass+" "+xp+" "+money)
					fs.writeFileSync('./status.json', JSON.stringify(_status))
				} catch (e) {
					console.log("ERROR")
					_status.push("err")
					fs.writeFileSync('./status.json', JSON.stringify(_status))	
				}

			} else {
				console.log('Directory not found.');
				_status.push("err")
				fs.writeFileSync('./status.json', JSON.stringify(_status))
			}

// is Email account valid? ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		} else if (receivedMessage.includes("valid")) {
			var data = receivedMessage.split(' ');
			var email = data[1]
			
			const dir = `./users/${email}/email.json`;
			// check if directory exists
			if (fs.existsSync(dir)) {
				console.log('Directory exists!');
				console.log("Correct Email")
					_status.push("valid ")
					fs.writeFileSync('./status.json', JSON.stringify(_status))
			} else {
				console.log('Directory not found.');
				_status.push("err")
				fs.writeFileSync('./status.json', JSON.stringify(_status))
			}

		} else if (receivedMessage.includes("confirmation")) {
//Confirm Transfer ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			var data = receivedMessage.split(' ');
			transfer(data)
		} else if (receivedMessage.includes("getPassword")) {
//Recover Password per email ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var data = receivedMessage.split(' ');
recoverPassword(data)			
// Get Xp ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		} else if (receivedMessage.includes("getxp")) {
		try {
				var data = receivedMessage.split(' ');
				var email = data[1]
			
				var getXp = data[2]
				var _xp = JSON.parse(fs.readFileSync(`./users/${email}/xp.json`));	
				var xp = _xp[0]	//--- xp

				var xpOld = Number(xp);
				var xpUp = Number(getXp);

				fs.readFile(`./users/${email}/xp.json`, 'utf-8', function(err, data) {
					if (err) throw err;	
					var newValue = data.replace(`${xpOld}`, xpUp);	
					fs.writeFile(`./users/${email}/xp.json`, newValue, 'utf-8', function(err, data) {
						if (err) throw err;
						console.log('Gained xp!');
					})
				})
		} catch (e) {
			console.log("ERROR")
		}

// Get Money ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		} else if (receivedMessage.includes("getmoney")) {
			var data = receivedMessage.split(' ');
			var email = data[1]
		
			var getMoney = data[2]
			var _money = JSON.parse(fs.readFileSync(`./users/${email}/money.json`));	
			var money = _money[0]	//--- money

			var moneyOld = Number(money);
			var moneyUp = Number(getMoney);

			fs.readFile(`./users/${email}/money.json`, 'utf-8', function(err, data) {
				if (err) throw err;	
				var newValue = data.replace(`${moneyOld}`, moneyUp);	
				fs.writeFile(`./users/${email}/money.json`, newValue, 'utf-8', function(err, data) {
					if (err) throw err;
					console.log('Gained money!');
				})
			})

		} else {
			console.log("No specific request Master.")
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
// Functions ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function makeAccount (email, username, password){
	exec(`rm -rf ./users/${email}`)
	await sleep(2000);
	exec(`mkdir ./users/${email}`)
	await sleep(2000);
	fs.appendFile(`./users/${email}/email.json`, `["${email}"]`, function (err) {				
	if (err) throw err;
		console.log('Email Opend.'); 
	});	
	await sleep(1000);
	fs.appendFile(`./users/${email}/username.json`, `["${username}"]`, function (err) {				
	if (err) throw err;
		console.log('Username Opend.'); 
	});	
	await sleep(1000);
	fs.appendFile(`./users/${email}/password.json`, `["${password}"]`, function (err) {				
	if (err) throw err;
		console.log('password Opend.'); 
	});	
	await sleep(1000);
	fs.appendFile(`./users/${email}/money.json`, `["100"]`, function (err) {				
	if (err) throw err;
		console.log('money Opend.'); 
	});	
	await sleep(1000);
	fs.appendFile(`./users/${email}/xp.json`, `["0"]`, function (err) {				
	if (err) throw err;
		console.log('xp Opend.'); 
	});	
	await sleep(1000);
	fs.appendFile(`./users/${email}/notes.json`, `[]`, function (err) {				
	if (err) throw err;
		console.log('notes Opend.'); 
	});	
	await sleep(1000);
	fs.appendFile(`./users/${email}/friends.json`, `[]`, function (err) {				
	if (err) throw err;
		console.log('friends Opend.'); 
	});	
	await sleep(1000);
	fs.appendFile(`./usernames/${username}.json`, `[${email}]`, function (err) {				
	if (err) throw err;
		console.log('usernameInfo Opend.'); 
	});	
}
// Send Email ------------------------------------------------------------------------------------------------------------------------------------------------
async function recoverPassword (data){

var email = data[1]
try {
	var _pass = JSON.parse(fs.readFileSync(`./users/${email}/password.json`));	
	var pass = _pass[0]	//--- Password
	var _username = JSON.parse(fs.readFileSync(`./users/${email}/username.json`));	
	var username = _username[0]	//--- username
} catch (e) {
	console.log("INVALID EMAIL")
}

	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	auth: {
		user: 'stardashnotification@gmail.com',
		pass: 'stardash20%'
	},
	});
	transporter.verify().then(console.log).catch(console.error);
	var mailOptions = {
	from: 'stardashnotification@gmail.com',
	to: `${email}`,
	subject: `StarDash Recover MyAccount`,

	text: `Dear StarDash user ${username},

Your account details are: 
Email: ${email}
Password: ${pass}

if you havent tapped on "forgot password" in the StarDash app, you can ignore this message.
							
StarDash Team`
	};
	transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
	});

}
// Transfer ------------------------------------------------------------------------------------------------------------------------------------------------
async function transfer (data){
var emailTo = data[1]
var emailFrom = data[2]
var amount = data[3]

_status.push("transferred")
fs.writeFileSync('./status.json', JSON.stringify(_status))

await sleep(1000)

var _moneyHis = JSON.parse(fs.readFileSync(`./users/${emailTo}/money.json`));	
var moneyHis = _moneyHis[0]	//--- money

await sleep(1000)

var newHisMoney = Number(_moneyHis) + Number(amount)
await sleep(1000)
		fs.readFile(`./users/${emailTo}/money.json`, 'utf-8', function(err, data) {
			if (err) throw err;	
			var newValue = data.replace(`${moneyHis}`, newHisMoney);	
			fs.writeFile(`./users/${emailTo}/money.json`, newValue, 'utf-8', function(err, data) {
				if (err) throw err;
				console.log('Transfered!');
			})
		})
await sleep(1000)

var _moneyMine = JSON.parse(fs.readFileSync(`./users/${emailTo}/money.json`));	
var moneyMine = _moneyMine[0]	//--- money

await sleep(1000)

var newMineMoney = Number(_moneyMine) - Number(amount)
await sleep(1000)
		fs.readFile(`./users/${emailFrom}/money.json`, 'utf-8', function(err, data) {
			if (err) throw err;	
			var newValue = data.replace(`${moneyMine}`, newMineMoney);	
			fs.writeFile(`./users/${emailFrom}/money.json`, newValue, 'utf-8', function(err, data) {
				if (err) throw err;
				console.log('Transfered!');
			})
		})
}
// Sleep x millis ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function sleep(ms) {
return new Promise((resolve) => {
  setTimeout(resolve, ms);
});
}
// End of file ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
