var net = require('net');
let fs = require('fs')
const _messages = JSON.parse(fs.readFileSync('./messages.json'));
var count1 = _messages.length;	

var server = net.createServer();
console.log('Started Server.\nAll Saved messages: '+ count1);

var server = net.createServer(function(socket) {

	
	
	server.getConnections(function(error,count){
		console.log('Number of concurrent connections to the server : ' + count);

		

		try{
		exec(`rm -rf ./online.json`)
		await delay(1000)
		fs.appendFile(`./online.json`, `["${count}"]`, function (err) {				
		});	
		} catch {
			console.error(err)
		}
		
	  });

	var count = _messages.length;
	var _online = JSON.parse(fs.readFileSync(`./online.json`));
	var online = _online[0]	//--- online

	message1 = _messages[Number(count) - 1]	
	message2 = _messages[Number(count) - 2]	
	message3 = _messages[Number(count) - 3]	
	message4 = _messages[Number(count) - 4]	
	message5 = _messages[Number(count) - 5]	
	message6 = _messages[Number(count) - 6]	
	message7 = _messages[Number(count) - 7]	
	message8 = _messages[Number(count) - 8]	
	message9 = _messages[Number(count) - 9]	
	message10 = _messages[Number(count) - 10]	

	message11 = _messages[Number(count) - 11]	
	message12 = _messages[Number(count) - 12]	
	message13 = _messages[Number(count) - 13]	
	message14 = _messages[Number(count) - 14]	
	message15 = _messages[Number(count) - 15]	
	message16 = _messages[Number(count) - 16]	
	message17 = _messages[Number(count) - 17]	
	message18 = _messages[Number(count) - 18]	
	message19 = _messages[Number(count) - 19]	
	message20 = _messages[Number(count) - 20]

	message21 = _messages[Number(count) - 21]	
	message22 = _messages[Number(count) - 22]	
	message23 = _messages[Number(count) - 23]	
	message24 = _messages[Number(count) - 24]	
	message25 = _messages[Number(count) - 25]	
	message26 = _messages[Number(count) - 26]	
	message27 = _messages[Number(count) - 27]	
	message28 = _messages[Number(count) - 28]	
	message29 = _messages[Number(count) - 29]	
	message30 = _messages[Number(count) - 30]

	message31 = _messages[Number(count) - 31]	
	message32 = _messages[Number(count) - 32]	
	message33 = _messages[Number(count) - 33]	
	message34 = _messages[Number(count) - 34]	
	message35 = _messages[Number(count) - 35]	
	message36 = _messages[Number(count) - 36]	
	message37 = _messages[Number(count) - 37]	
	message38 = _messages[Number(count) - 38]	
	message39 = _messages[Number(count) - 39]	
	message40 = _messages[Number(count) - 40]	

	message41 = _messages[Number(count) - 41]	
	message42 = _messages[Number(count) - 42]	
	message43 = _messages[Number(count) - 43]	
	message44 = _messages[Number(count) - 44]	
	message45 = _messages[Number(count) - 45]	
	message46 = _messages[Number(count) - 46]	
	message47 = _messages[Number(count) - 47]	
	message48 = _messages[Number(count) - 48]	
	message49 = _messages[Number(count) - 49]	
	message50 = _messages[Number(count) - 50]

	message51 = _messages[Number(count) - 51]	
	message52 = _messages[Number(count) - 52]	
	message53 = _messages[Number(count) - 53]	
	message54 = _messages[Number(count) - 54]	
	message55 = _messages[Number(count) - 55]	
	message56 = _messages[Number(count) - 56]	
	message57 = _messages[Number(count) - 57]	
	message58 = _messages[Number(count) - 58]	
	message59 = _messages[Number(count) - 59]	
	message60 = _messages[Number(count) - 60]

	message61 = "Total messages: "+count

	result = ("ONLINE: "+online+"\n"+message1+message2+message3+message4+message5+message6+message7+message8+message9+message10+message11+message12+message13+message14+message15+message16+message17+message18+message19+message20+message21+message22+message23+message24+message25+message26+message27+message28+message29+message30+message31+message32+message33+message34+message35+message36+message37+message38+message39+message40+message41+message42+message43+message44+message45+message46+message47+message48+message49+message50+message51+message52+message53+message54+message55+message56+message57+message58+message59+message60+message61).replace("undefined","")
    finalresult = result.replace(/undefined/g,"")
	socket.write(finalresult);


	socket.on('data', function(chunk) {
		
		console.log('---------server details -----------------');
		console.log("All Messages: "+count)
		var address = server.address();
		var port = address.port;
		var family = address.family;
		var ipaddr = address.address;
		console.log('Server is listening at port' + port);
		console.log('Server ip :' + ipaddr);
		console.log('Server is IP4/IP6 : ' + family);
	  
		var lport = socket.localPort;
		var laddr = socket.localAddress;
		console.log('Server is listening at LOCAL port' + lport);
		console.log('Server LOCAL ip :' + laddr);
	  
		console.log('------------remote client info --------------');
		console.log('A new connection has been established.');
	
		var rport = socket.remotePort;
		var raddr = socket.remoteAddress;
		var rfamily = socket.remoteFamily;
	  
		console.log('REMOTE Socket is listening at port' + rport);
		console.log('REMOTE Socket ip :' + raddr);
		console.log('REMOTE Socket is IP4/IP6 : ' + rfamily);
	  
		console.log('--------------------------------------------')

		if (chunk.toString().includes("clear")) {
			
			exec(`rm -rf ./messages.json`);
			var add = new Date().getHours()+":"+new Date().getMinutes();

			fs.appendFile(`./messages.json`, `["${add} Server Started."]`, function (err) {				
			if (err) throw err;
			});
	
	} else if (chunk.toString().includes("fuck"||"sex"||"bitch"||"stupid"||"Fuck"||"hate")) {

		texte = new Date().getHours()+":"+new Date().getMinutes()+" StarDash 🌟 : Bad word :("
		_messages.push(chunk.toString())
		fs.writeFileSync('./messages.json', JSON.stringify(_messages))
		_messages.push(texte+"\n")
		fs.writeFileSync('./messages.json', JSON.stringify(_messages))

	} else if (chunk.toString().includes("hi"||"Hi"||"hai"||"Hai"||"hello"||"Hello")) {
		
		texte = new Date().getHours()+":"+new Date().getMinutes()+" StarDash 🌟 : Hii!"
		_messages.push(chunk.toString())
		fs.writeFileSync('./messages.json', JSON.stringify(_messages))
		_messages.push(texte+"\n")
		fs.writeFileSync('./messages.json', JSON.stringify(_messages))

	} else if (chunk.toString().includes("bot")) {

				texte = new Date().getHours()+":"+new Date().getMinutes()
				var alexa = require("alexa-bot-api-v4");
				var ai = new alexa();
                 
				ai.getReply(`${texte.split(" ").pop()}`, [], "english", "O_o").then((replys) => {
				console.log(result);
				console.log(replys);
				_messages.push(chunk.toString())
				fs.writeFileSync('./messages.json', JSON.stringify(_messages))
				_messages.push(texte+" StarDash 🌟 : "+replys+"\n")
				fs.writeFileSync('./messages.json', JSON.stringify(_messages))

		});


	} else {

		  //-- Save Message         		
		  _messages.push(chunk.toString())
		  fs.writeFileSync('./messages.json', JSON.stringify(_messages))
	}

	});
	
	socket.on('end', function() {
		// console.log('Closing connection with the client');
		 socket.destroy()
	});

	socket.on('error', function(err) {
		// console.log(`Error: ${err}`);
	});
});


server.listen(4753);

/* -----------------------------------
var client = new net.Socket();
client.connect(4753, function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
}); */