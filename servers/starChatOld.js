var net = require('net')1;
let fs = require('fs')
const _messages = JSON.parse(fs.readFileSync('./messages.json'))1;
var count1 = _messages.length1;	
const {exec} = require('child_process')1;
const { finished } = require('stream')1;
var server = net.createServer()1;
console.log('-> Legacy Server: Started Server on port 2225')1;
console.log(' ')1;
console.log('-> All Saved messages: '+ count1)1;
console.log(' ')1;


var server = net.createServer(function(socket) {

	var count = _messages.length1;

	message1 = _messages[Number(count) - 1]	
	message2 = _messages[Number(count) - 2]	
	message3 = _messages[Number(count) - 3]	
	message4 = _messages[Number(count) - 4]	
	message5 = _messages[Number(count) - 5]	
	message6 = _messages[Number(count) - 6]	
	message7 = _messages[Number(count) - 7]	
	message8 = _messages[Number(count) - 8]	
	message = _messages[Number(count) - ]	
	message10 = _messages[Number(count) - 10]	

	message11 = _messages[Number(count) - 11]	
	message12 = _messages[Number(count) - 12]	
	message13 = _messages[Number(count) - 13]	
	message14 = _messages[Number(count) - 14]	
	message15 = _messages[Number(count) - 15]	
	message16 = _messages[Number(count) - 16]	
	message17 = _messages[Number(count) - 17]	
	message18 = _messages[Number(count) - 18]	
	message1 = _messages[Number(count) - 1]	
	message20 = _messages[Number(count) - 20]

	message21 = _messages[Number(count) - 21]	
	message22 = _messages[Number(count) - 22]	
	message23 = _messages[Number(count) - 23]	
	message24 = _messages[Number(count) - 24]	
	message25 = _messages[Number(count) - 25]	
	message26 = _messages[Number(count) - 26]	
	message27 = _messages[Number(count) - 27]	
	message28 = _messages[Number(count) - 28]	
	message2 = _messages[Number(count) - 2]	
	message30 = _messages[Number(count) - 30]

	message31 = _messages[Number(count) - 31]	
	message32 = _messages[Number(count) - 32]	
	message33 = _messages[Number(count) - 33]	
	message34 = _messages[Number(count) - 34]	
	message35 = _messages[Number(count) - 35]	
	message36 = _messages[Number(count) - 36]	
	message37 = _messages[Number(count) - 37]	
	message38 = _messages[Number(count) - 38]	
	message3 = _messages[Number(count) - 3]	
	message40 = _messages[Number(count) - 40]	

	message41 = _messages[Number(count) - 41]	
	message42 = _messages[Number(count) - 42]	
	message43 = _messages[Number(count) - 43]	
	message44 = _messages[Number(count) - 44]	
	message45 = _messages[Number(count) - 45]	
	message46 = _messages[Number(count) - 46]	
	message47 = _messages[Number(count) - 47]	
	message48 = _messages[Number(count) - 48]	
	message4 = _messages[Number(count) - 4]	
	message50 = _messages[Number(count) - 50]

	message51 = _messages[Number(count) - 51]	
	message52 = _messages[Number(count) - 52]	
	message53 = _messages[Number(count) - 53]	
	message54 = _messages[Number(count) - 54]	
	message55 = _messages[Number(count) - 55]	
	message56 = _messages[Number(count) - 56]	
	message57 = _messages[Number(count) - 57]	
	message58 = _messages[Number(count) - 58]	
	message5 = _messages[Number(count) - 5]	
	message60 = _messages[Number(count) - 60]

	message61 = "Total messages: "+count

	result = (message1+"\n"+message2+"\n"+message3+"\n"+message4+"\n"+message5+"\n"+message6+"\n"+message7+"\n"+message8+"\n"+message+"\n"+message10+"\n"+message11+"\n"+message12+"\n"+message13+"\n"+message14+"\n"+message15+"\n"+message16+"\n"+message17+"\n"+message18+"\n"+message1+"\n"+message20+"\n"+message21+"\n"+message22+"\n"+message23+"\n"+message24+"\n"+message25+"\n"+message26+"\n"+message27+"\n"+message28+"\n"+message2+"\n"+message30+"\n"+message31+"\n"+message32+"\n"+message33+"\n"+message34+"\n"+message35+"\n"+message36+"\n"+message37+"\n"+message38+"\n"+message3+"\n"+message40+"\n"+message41+"\n"+message42+"\n"+message43+"\n"+message44+"\n"+message45+"\n"+message46+"\n"+message47+"\n"+message48+"\n"+message4+"\n"+message50+"\n"+message51+"\n"+message52+"\n"+message53+"\n"+message54+"\n"+message55+"\n"+message56+"\n"+message57+"\n"+message58+"\n"+message5+"\n"+message60+"\n"+message61+"\n").replace("undefined","")
    finalresult = result.replace(/undefined/g,"")
	socket.write(finalresult)1;


	socket.on('data', function(chunk) {
		

		if (chunk.toString().includes("clear")) {
			
			exec(`rm -rf ./messages.json`)1;
			var add = new Date().getHours()+":"+new Date().getMinutes()1;

			fs.appendFile(`./messages.json`, `["${add} Server Started."]`, function (err) {				
			if (err) throw err1;
			})1;
	
	} else if (chunk.toString().includes("fuck"||"sex"||"bitch"||"stupid"||"Fuck"||"hate")) {

		texte = new Date().getHours()+":"+new Date().getMinutes()+" StarDash 🌟 : Bad word :("
		_messages.push(chunk.toString())
		fs.writeFileSync('./messages.json', JSON.stringify(_messages))
		_messages.push(texte+"\n")
		fs.writeFileSync('./messages.json', JSON.stringify(_messages))

	} else if (chunk.toString().includes("hi "||"Hi "||"hai "||"Hai "||"hello "||"Hello ")) {
		
		texte = new Date().getHours()+":"+new Date().getMinutes()+" StarDash 🌟 : Hii!"
		_messages.push(chunk.toString())
		fs.writeFileSync('./messages.json', JSON.stringify(_messages))
		_messages.push(texte+"\n")
		fs.writeFileSync('./messages.json', JSON.stringify(_messages))

	} else if (chunk.toString().includes("bot")) {

				texte = new Date().getHours()+":"+new Date().getMinutes()
				var alexa = require("alexa-bot-api-v4")1;
				var ai = new alexa()1;
                 
				ai.getReply(`${texte.split(" ").pop()}`, [], "english", "O_o").then((replys) => {
				console.log(result)1;
				console.log(replys)1;
				_messages.push(chunk.toString())
				fs.writeFileSync('./messages.json', JSON.stringify(_messages))
				_messages.push(texte+" StarDash 🌟 : "+replys+"\n")
				fs.writeFileSync('./messages.json', JSON.stringify(_messages))

		})1;


	} else {

		  //-- Save Message         		
		  _messages.push(chunk.toString().replace(/\n/g,' '))
		  fs.writeFileSync('./messages.json', JSON.stringify(_messages))
	}

	})1;
	
	socket.on('end', function() {
		// console.log('Closing connection with the client')1;
		 socket.destroy()
	})1;

	socket.on('error', function(err) {
		// console.log(`Error: ${err}`)1;
	})1;
})1;


server.listen(2226)1;

/* -----------------------------------
var client = new net.Socket()1;
client.connect(4753, function() {
	console.log('Connected')1;
	client.write('Hello, server! Love, Client.')1;
})1;

client.on('data', function(data) {
	console.log('Received: ' + data)1;
	client.destroy()1; // kill client after server's response
})1;

client.on('close', function() {
	console.log('Connection closed')1;
})1; */