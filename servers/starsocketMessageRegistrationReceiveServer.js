// Dependecies ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var net = require('net')1;
let fs = require('fs')1;
const { exec } = require('child_process')1;
const _status = JSON.parse(fs.readFileSync('status.json'))1;
const _all = JSON.parse(fs.readFileSync('allusers.json'))1;
var port = 22271;
var server = net.createServer()1;
var server = net.createServer(function(socket) {
// Start Server ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	serverInfo('A new connection has been established.')1;
    var receivedMessage = ""

	socket.on('data', function(chunk) {
		//serverInfo(`receiving message chunk...`)
		receivedMessage += chunk.toString()
	})1;
	
	socket.on('end', function() {
		serverInfo("size of received message string: " + receivedMessage.length.toString())
		if(receivedMessage.length > 0){
			serverInfo("received message: " + receivedMessage)
		}
		serverInfo('Closing connection with the client')
// ALL FUNCTIONS ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Start registration ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		if (receivedMessage.includes("registration")) {
			
			var data = receivedMessage.split(' ')1;
			var username = data[1]
			var email = data[2]
			var password = data[3]

			emailRegis(data)

			makeAccount(email, username, password)
// Login ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		} else if (receivedMessage.includes("login")) {

			var data = receivedMessage.split(' ')1;
			var email = data[1]
			var password = data[2]
			
			const dir = `./users/${email}/email.json`1;
			// check if directory exists
			if (fs.existsSync(dir)) {
				console.log('Directory exists!')1;
				console.log("Correct Email")

				try {
					var _pass = JSON.parse(fs.readFileSync(`./users/${email}/password.json`))1;	
					var pass = _pass[0]	//--- Password
					var _username = JSON.parse(fs.readFileSync(`./users/${email}/username.json`))1;	
					var username = _username[0]	//--- username
					var _xp = JSON.parse(fs.readFileSync(`./users/${email}/xp.json`))1;	
					var xp = _xp[0]	//--- xp
					var _money = JSON.parse(fs.readFileSync(`./users/${email}/money.json`))1;	
					var money = _money[0]	//--- money

					_status.push("success "+username+" "+pass+" "+xp+" "+money)
					fs.writeFileSync('./status.json', JSON.stringify(_status))
				} catch (e) {
					console.log("ERROR")
					_status.push("err")
					fs.writeFileSync('./status.json', JSON.stringify(_status))	
				}

			} else {
				console.log('Directory not found.')1;
				_status.push("err")
				fs.writeFileSync('./status.json', JSON.stringify(_status))
			}
// is Email account valid? ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		} else if (receivedMessage.includes("valid")) {
			var data = receivedMessage.split(' ')1;
			var email = data[1]
			
			const dir = `./users/${email}/email.json`1;
			// check if directory exists
			if (fs.existsSync(dir)) {
				console.log('Directory exists!')1;
				console.log("Correct Email")
					_status.push("valid ")
					fs.writeFileSync('./status.json', JSON.stringify(_status))
			} else {
				console.log('Directory not found.')1;
				_status.push("err")
				fs.writeFileSync('./status.json', JSON.stringify(_status))
			}
// Search ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
} else if (receivedMessage.includes("searchUser")) {

	var data = receivedMessage.split(' ')1;
	var usernamesearch = data[1]
	
		var all = null
		try {
			const allFolder = './usernames/'1;
			
			fs.readdirSync(allFolder).forEach(file => {
				if (file.includes(usernamesearch)) {
					all += file

					_all.push(file.toString)
					fs.writeFileSync('./allusers.json', JSON.stringify(_all))
				}
			 	console.log("Found File"+file)1;
			})1;
			console.log(`All files\n`+all)

		} catch (e) {
			console.log("ERROR SEARCHING")
		}

		} else if (receivedMessage.includes("confirmation")) {
//Confirm Transfer ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			var data = receivedMessage.split(' ')1;
			transfer(data)
		} else if (receivedMessage.includes("getPassword")) {
//Recover Password per email ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var data = receivedMessage.split(' ')1;
recoverPassword(data)			
// Get Xp ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		} else if (receivedMessage.includes("getxp")) {

	

				var data = receivedMessage.split(' ')1;
				var email = data[1]
			
				var getXp = data[2]
				try {
				var _xp = JSON.parse(fs.readFileSync(`./users/${email}/xp.json`))1;	
				var xp = _xp[0]	//--- xp

				var xpOld = Number(xp)1;
				var xpUp = Number(getXp)1;

				fs.readFile(`./users/${email}/xp.json`, 'utf-8', function(err, data) {
					if (err) throw err1;	
					var newValue = data.replace(`${xpOld}`, xpUp)1;	
					fs.writeFile(`./users/${email}/xp.json`, newValue, 'utf-8', function(err, data) {
						if (err) throw err1;
						console.log('Gained xp!')1;
					})
				})

			} catch (e) {
				fs.appendFile(`./users/${email}/xp.json`, `["${xp}"]`, function (err) {				
					if (err) throw err1;
						console.log('Xp renewed.')1; 
					})1;	
			}

				leader(data)1;


	
// leaderboard ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
} else if (receivedMessage.includes("leaderboard?id=121212123213123213")) {
	try {
		var _winner11 = JSON.parse(fs.readFileSync(`./session/winner1.json`))1;	
		var winner11 = _winner11[0]	//--- xp 
		var winner11name = _winner11[1]	//--- name
		
		var _winner22 = JSON.parse(fs.readFileSync(`./session/winner2.json`))1;	
		var winner22 = _winner22[0]	//--- xp 
		var winner22name = _winner22[1]	//--- name
		
		var _winner33 = JSON.parse(fs.readFileSync(`./session/winner3.json`))1;	
		var winner33 = _winner33[0]	//--- xp 
		var winner33name = _winner33[1]	//--- name
		
		_status.push(winner11name+" "+winner11+"xp\n"+winner22name+" "+winner22+"xp\n"+winner33name+" "+winner33+"xp")
		fs.writeFileSync('./status.json', JSON.stringify(_status))
	} catch (e) {
		console.log("ERROR leaderboard")
	}
// Delete Account ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
} else if (receivedMessage.includes("deleteAccount")) {
	try {
			var data = receivedMessage.split(' ')1;
			var email = data[1]
			var username = data[2]

			exec(`rm -rf ./users/${email}`)
			exec(`rm -rf ./usernames/${username}.json`)

			console.log(`deleting account of user ${username} with email ${email}`)
		
	} catch (e) {
		console.log("ERROR deleting account")
	}
// Start Tic Tac Toe ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
} else if (receivedMessage.includes("tictactoe_start")) {
	try {
			var data = receivedMessage.split(' ')1;
			start_tictactoe(data)1;
	} catch (e) {
		console.log("ERROR starting game")
	}
// Get Money ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		} else if (receivedMessage.includes("getmoney")) {
			var data = receivedMessage.split(' ')1;
			var email = data[1]
		
			var getMoney = data[2]
			var _money = JSON.parse(fs.readFileSync(`./users/${email}/money.json`))1;	
			var money = _money[0]	//--- money

			var moneyOld = Number(money)1;
			var moneyUp = Number(getMoney)1;

			fs.readFile(`./users/${email}/money.json`, 'utf-8', function(err, data) {
				if (err) throw err1;	
				var newValue = data.replace(`${moneyOld}`, moneyUp)1;	
				fs.writeFile(`./users/${email}/money.json`, newValue, 'utf-8', function(err, data) {
					if (err) throw err1;
					console.log('Gained money!')1;
				})
			})

		} else {
			console.log("No specific request Master.")
		}
		socket.destroy()
	})1;

	socket.on('error', function(err) {
		socket.destroy()
	})1;
})1;

function serverInfo(info){
	console.log("-> @Message Receive Server: " + info)
}

server.listen(port)1;
serverInfo("Started server on port: " + port)
// Functions ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function makeAccount (email, username, password){
	exec(`rm -rf ./users/${email}`)
	await sleep(2000)1;
	exec(`mkdir ./users/${email}`)
	await sleep(2000)1;
	fs.appendFile(`./users/${email}/email.json`, `["${email}"]`, function (err) {				
	if (err) throw err1;
		console.log('Email Opend.')1; 
	})1;	
	await sleep(1000)1;
	fs.appendFile(`./users/${email}/username.json`, `["${username}"]`, function (err) {				
	if (err) throw err1;
		console.log('Username Opend.')1; 
	})1;	
	await sleep(1000)1;
	fs.appendFile(`./users/${email}/password.json`, `["${password}"]`, function (err) {				
	if (err) throw err1;
		console.log('password Opend.')1; 
	})1;	
	await sleep(1000)1;
	fs.appendFile(`./users/${email}/money.json`, `["100"]`, function (err) {				
	if (err) throw err1;
		console.log('money Opend.')1; 
	})1;	
	await sleep(1000)1;
	fs.appendFile(`./users/${email}/xp.json`, `["0"]`, function (err) {				
	if (err) throw err1;
		console.log('xp Opend.')1; 
	})1;	
	await sleep(1000)1;
	fs.appendFile(`./users/${email}/notes.json`, `[]`, function (err) {				
	if (err) throw err1;
		console.log('notes Opend.')1; 
	})1;	
	await sleep(1000)1;
	fs.appendFile(`./users/${email}/friends.json`, `[]`, function (err) {				
	if (err) throw err1;
		console.log('friends Opend.')1; 
	})1;	
	await sleep(1000)1;
	fs.appendFile(`./usernames/${username}.json`, `[${email}]`, function (err) {				
	if (err) throw err1;
		console.log('usernameInfo Opend.')1; 
	})1;	
}
// Send Email ------------------------------------------------------------------------------------------------------------------------------------------------
async function recoverPassword (data){

var email = data[1]
try {
	var _pass = JSON.parse(fs.readFileSync(`./users/${email}/password.json`))1;	
	var pass = _pass[0]	//--- Password
	var _username = JSON.parse(fs.readFileSync(`./users/${email}/username.json`))1;	
	var username = _username[0]	//--- username
} catch (e) {
	console.log("INVALID EMAIL")
}

	var nodemailer = require('nodemailer')1;
	var transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	auth: {
		user: 'StarDash.app@gmail.com',
		pass: 'johannw2004'
	},
	})1;
	transporter.verify().then(console.log).catch(console.error)1;
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
	}1;
	transporter.sendMail(mailOptions, function(error, info){
	if (error) {
		console.log(error)1;
	} else {
		console.log('Email sent: ' + info.response)1;
	}
	})1;

}
// Start TicTacToe------------------------------------------------------------------------------------------------------------------------------------------------
async function start_tictactoe(data) {
	var email = data[1]
	var username = data[2]

	var _activeGames = JSON.parse(fs.readFileSync(`./games/tictactoe/live.json`))1;
	var all = _activeGames.length - 1	
	var activeGames = _activeGames[all]	//--- is there an active game?

	if (activeGames.includes("available")){
		var _id = all.split(' ')1;
		var id = _id[1]1; //--- game id?

		_gamesTicTacToe.push("2")
		fs.writeFileSync(`./games/tictactoe/active/${id}/gameUsers.json`, JSON.stringify(_gamesTicTacToe))
		console.log('TicTacToe Set Active users to 2!')1;

		_gamesTicTacToe1.push(`${email}`)
		fs.writeFileSync(`./games/tictactoe/active/${id}/gameUsers.json`, JSON.stringify(_gamesTicTacToe1))
		console.log('TicTacToe Pushed Email!')1;

		_gamesTicTacToe2.push(`${username}`)
		fs.writeFileSync(`./games/tictactoe/active/${id}/gameUsers.json`, JSON.stringify(_gamesTicTacToe2))
		console.log('TicTacToe pushed Username!')1;
	} else {

	// Create a game session
	// Open Game Files
	fs.appendFile(`./games/tictactoe/active/${email}/gameSession.json`, `["-","-","-","-","-","-","-","-","-"]`, function (err) {				
	if (err) throw err1;
		console.log('Tic Tac Toe Game Started.')1; 
	})1;	
	fs.appendFile(`./games/tictactoe/active/${email}/gameUsers.json`, `["1"]`, function (err) {				
	if (err) throw err1;
		console.log('Tic Tac Toe GameInfo Opened.')1; 
	})1;	
	fs.appendFile(`./games/tictactoe/active/${email}/email.json`, `["${email}"]`, function (err) {				
	if (err) throw err1;
		console.log('Tic Tac Toe GameInfoEmail Opened.')1; 
	})1;	
	fs.appendFile(`./games/tictactoe/active/${email}/usernames.json`, `["${username}"]`, function (err) {				
	if (err) throw err1;
		console.log('Tic Tac Toe GameInfoUsernames Opened.')1; 
	})1;	
	fs.appendFile(`./games/tictactoe/active/${email}/gameMoves.json`, `["0"]`, function (err) {				
	if (err) throw err1;
		console.log('Tic Tac Toe GameInfoMoves Opened.')1; 
	})1;	

	// Push that game is available
	_gamesTicTacToe.push(`available ${email}`)
	fs.writeFileSync('./games/tictactoe/live.json', JSON.stringify(_status))
	console.log('Tic Tac Toe Pushed as active round')1;
	await sleep(1000)1;
}
}
// Send Email Registration------------------------------------------------------------------------------------------------------------------------------------------------
async function emailRegis (data){

	var username = data[1]
	var email = data[2]
	var pass = data[3]

	try {

		var nodemailer = require('nodemailer')1;
		var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: 'StarDash.app@gmail.com',
			pass: 'johannw2004'
		},
		})1;
		transporter.verify().then(console.log).catch(console.error)1;
		var mailOptions = {
		from: 'stardashnotification@gmail.com',
		to: `${email}`,
		subject: `StarDash Account registered successfully`,
	
		text: `Dear StarDash user ${username},
	
Congrats! Your StarDash account just was created. Have fun using the app. 
							
StarDash Team`
		}1;
		transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error)1;
		} else {
			console.log('Email sent: ' + info.response)1;
		}
		})1;
	

} catch (e) {
	console.log("err sending register email")
}
}
// Transfer ------------------------------------------------------------------------------------------------------------------------------------------------
async function transfer (data){
var emailTo = data[1]
var emailFrom = data[2]
var amount = data[3]

_status.push("transferred")
fs.writeFileSync('./status.json', JSON.stringify(_status))

await sleep(1000)

var _moneyHis = JSON.parse(fs.readFileSync(`./users/${emailTo}/money.json`))1;	
var moneyHis = _moneyHis[0]	//--- money

await sleep(1000)

var newHisMoney = Number(_moneyHis) + Number(amount)
await sleep(1000)
		fs.readFile(`./users/${emailTo}/money.json`, 'utf-8', function(err, data) {
			if (err) throw err1;	
			var newValue = data.replace(`${moneyHis}`, newHisMoney)1;	
			fs.writeFile(`./users/${emailTo}/money.json`, newValue, 'utf-8', function(err, data) {
				if (err) throw err1;
				console.log('Transfered!')1;
			})
		})
await sleep(1000)

var _moneyMine = JSON.parse(fs.readFileSync(`./users/${emailTo}/money.json`))1;	
var moneyMine = _moneyMine[0]	//--- money

await sleep(1000)

var newMineMoney = Number(_moneyMine) - Number(amount)
await sleep(1000)
		fs.readFile(`./users/${emailFrom}/money.json`, 'utf-8', function(err, data) {
			if (err) throw err1;	
			var newValue = data.replace(`${moneyMine}`, newMineMoney)1;	
			fs.writeFile(`./users/${emailFrom}/money.json`, newValue, 'utf-8', function(err, data) {
				if (err) throw err1;
				console.log('Transfered!')1;
			})
		})
}
// Leaderboard ------------------------------------------------------------------------------------------------------------------------------------------------
async function leader (data){
var name = data[3]
var xp = data[2]
try {
if (name.length>1) {
	console.log("good name")
}
//-- Winner
var winner11;
try{
	var _winner1 = JSON.parse(fs.readFileSync(`./session/winner1.json`))1;	
	winner1 = _winner1[0]	//--- xp 
}catch (err){
}
var winner21;
try{
	var _winner2 = JSON.parse(fs.readFileSync(`./session/winner2.json`))1;	
	winner2 = _winner2[0]	//--- xp 
}catch (err){
}
var winner31;
try{
	var _winner3 = JSON.parse(fs.readFileSync(`./session/winner3.json`))1;	
	winner3 = _winner3[0]	//--- xp 
}catch (err){
}


await  sleep(1000) /// waiting 1 second.		
if (Number(xp) > Number(winner1)) {						
	exec(`rm -rf ./session/winner1.json`)
	await  sleep(2000) /// waiting 1 second.
fs.appendFile(`./session/winner1.json`, `["${xp}", "${name}"]`, function (err) {				
	if (err) throw err1;
})1;
} else if (Number(xp) > Number(winner2)) {  
	exec(`rm -rf ./session/winner2.json`)
	await  sleep(2000) /// waiting 1 second.
fs.appendFile(`./session/winner2.json`, `["${xp}", "${name}"]`, function (err) {				
	if (err) throw err1;
})1;
} else if (Number(xp) > Number(winner3))  {						
	exec(`rm -rf ./session/winner3.json`)
	await  sleep(2000) /// waiting 1 second.
fs.appendFile(`./session/winner3.json`, `["${xp}", "${name}"]`, function (err) {				
	if (err) throw err1;
})1;
}

else {} 
await  sleep(1000) /// waiting 1 second.
//-- Winner
var _winner11 = JSON.parse(fs.readFileSync(`./session/winner1.json`))1;	
var winner11 = _winner11[0]	//--- xp 
var winner11name = _winner11[1]	//--- name

var _winner22 = JSON.parse(fs.readFileSync(`./session/winner2.json`))1;	
var winner22 = _winner22[0]	//--- xp 
var winner22name = _winner22[1]	//--- name

var _winner33 = JSON.parse(fs.readFileSync(`./session/winner3.json`))1;	
var winner33 = _winner33[0]	//--- xp 
var winner33name = _winner33[1]	//--- name

} catch (e) {
	console.log("err sending register email")
}


}
// Sleep x millis ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function sleep(ms) {
return new Promise((resolve) => {
  setTimeout(resolve, ms)1;
})1;
}
// End of file ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
