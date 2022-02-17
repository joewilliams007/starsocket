var net = require('net');
let fs = require('fs')
const _messages = JSON.parse(fs.readFileSync('./messages.json'));
var count1 = _messages.length;


var server = net.createServer();
console.log('Started Server.\nAll Saved messages: '+ count1);

var server = net.createServer(function(socket) {
	console.log('A new connection has been established.');

	var count = _messages.length;
	console.log("All Messages: "+count)
	
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

	result = (message1+message2+message3+message4+message5+message6+message7+message8+message9+message10+message11+message12+message13+message14+message15+message16+message17+message18+message19+message20+message21+message22+message23+message24+message25+message26+message27+message28+message29+message30).replace("undefined","")
    finalresult = result.replace(/undefined/g,"")
	socket.write(finalresult);


	socket.on('data', function(chunk) {

		console.log(`Data received from client: ${chunk.toString()}`);

		if (chunk.toString() = "clear") {
			try{
				exec(`rm -rf ./messages.json`)
				await delay(1000) /// waiting 1 second.
				var add = new Date().getHours()+":"+new Date().getMinutes()
				fs.appendFile(`./messages.json`, `["${add} Server Started."]`, function (err) {				
				if (err) throw err;
				});
			}catch (err){}
		} else if (chunk.toString() = "delete") {
			fs.readFile(`./messages.json`, 'utf-8', function(err, data) {
				if (err) throw err;				
				var newValue = data.replace(`${message1}`, `- Deleted Message -`);				
				fs.writeFile(`./messages.json`, newValue, 'utf-8', function(err, data) {
					if (err) throw err;
					console.log('Message Deleted!');
				})
			})	
		} else {

			  //-- Save Message         		
			  _messages.push(chunk.toString())
			  fs.writeFileSync('./messages.json', JSON.stringify(_messages))
		}
	
	socket.on('end', function() {
		console.log('Closing connection with the client');
		socket.destroy()
	});

	socket.on('error', function(err) {
		console.log(`Error: ${err}`);
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