var net = require('net');
let fs = require('fs');
const { exec } = require('child_process');
const _status = JSON.parse(fs.readFileSync('status.json'));
var port = 2227;
var server = net.createServer();
var server = net.createServer(function(socket) {

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

		if (receivedMessage.includes("registration")) {
			
			var data = receivedMessage.split(' ');
			var username = data[1]
			var email = data[2]
			var password = data[3]

			makeAccount(email, username, password)
			

		} else if (receivedMessage.includes("login")) {

			var data = receivedMessage.split(' ');
			var email = data[1]
			var password = data[2]
			
			const dir = `./users/${email}/email.json`;
			// check if directory exists
			if (fs.existsSync(dir)) {
				console.log('Directory exists!');
				console.log("Correct Email")
			} else {
				console.log('Directory not found.');
			}

			var email;
			try {
				var _savedEmail = fs.readFile(`./users/${email}/email.json`)
				email = _savedEmail[0]
			} catch (e) {
				console.log("Wrong Email")	
				_status.push("error")
				fs.writeFileSync('./status.json', JSON.stringify(_status))
			}
			var password;
			try {
				var _savedPassword = fs.readFile(`./users/${email}/password.json`)
				password = _savedPassword[0]
			} catch (e) {
				console.log("Wrong Password")	
				_status.push("Wrong Password")
				fs.writeFileSync('./status.json', JSON.stringify(_status))
			}


		} else if (receivedMessage.includes("getxp")) {
			var email = data[1]
			var getXp = data[2]

			var _xp = fs.readFile(`./users/${email}/xp.json`)
			var xp = _xp[0]

			var xpOld = Number(xp);
			var xpUp = Number(getXp);
			var xpNew = xpUp + xpOld; 

			fs.readFile(`./users/${email}/xp.json`, 'utf-8', function(err, data) {
				if (err) throw err;	
				var newValue = data.replace(`${xpOld}`, xpNew);	
				fs.writeFile(`./users/${email}/xp.json`, newValue, 'utf-8', function(err, data) {
					if (err) throw err;
					console.log('Gained xp!');
				})
			})

		} else if (receivedMessage.includes("getmoney")) {
			var email = data[1]
			var getMoney = data[2]

			var _money = fs.readFile(`./users/${email}/money.json`)
			var money = _money[0]

			var moneyOld = Number(money);
			var moneyUp = Number(getMoney);
			var moneyNew = moneyUp + moneyOld; 

			fs.readFile(`./users/${email}/money.json`, 'utf-8', function(err, data) {
				if (err) throw err;	
				var newValue = data.replace(`${moneyOld}`, moneyNew);	
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
}



function sleep(ms) {
return new Promise((resolve) => {
  setTimeout(resolve, ms);
});
}