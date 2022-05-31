var net = require('net');
let fs = require('fs');


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


var port = 2225
var server = net.createServer();

var server = net.createServer(function(socket) {

	var ip = socket.remoteAddress
	var dir = "./user_messages/"+ip+"/messages.json";
	var user_folder = dir

	var _messages = "none"
	try {
	_messages = JSON.parse(fs.readFileSync(user_folder));
	} catch (err){

	}



	var entireMessage = ""

	// for (i = 0; i < 60; i++){
	// 	entireMessage += _messages[i] + "\n"
	// }

	function removeFirstWord(str) {
		const indexOfSpace = str.indexOf(' ');
		if (indexOfSpace === -1) {
		  return '';
		}
		return str.substring(indexOfSpace + 1);
	  }

	entireMessage += "Total messages: "+ _messages.length


	connection.query( // get the users id
	`SELECT reply FROM Ip
	WHERE ip="${ip}"`
	, function (error, results, fields) {
		if (error) serverInfo(error.message);
		
		var res = JSON.parse(JSON.stringify(results))

		serverInfo(results[0].reply)

		try {
			socket.write(results[0].reply)
		} catch (err){
			serverInfo("error sending!")
			socket.write("error")
		}
			
		socket.end();
	});





	serverInfo('A new connection has been established.');
	
	socket.on('end', function() {
	
		socket.destroy()
	});

	socket.on('error', function(err) {
		socket.destroy()
	});
});


function serverInfo(info){
	var d = new Date()     

	console.log(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" >_> (sending) " + info)
}

server.listen(port);
serverInfo("Started server on port: " + port)



