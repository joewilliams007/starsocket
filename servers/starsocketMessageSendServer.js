var net = require('net');
var fs = require('fs');
var mysql = require('mysql'); 
var { exec } = require('child_process');
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
	
	connection.query( // get the users id
	`SELECT reply FROM Ip
	WHERE ip="${ip}"`
	, function (error, results, fields) {
		if (error) serverInfo(error.message);
		try {
			var reply = results[0].reply;
			if (reply.length>50){
				serverInfo("reply is too long")
			} else {
				serverInfo(reply)
			}
			try {
				socket.write(reply)
			} catch (err){
				serverInfo("error sending!")
				socket.write("error")
			}
		} catch (err){
			serverInfo("error sending!")
		}	
		socket.end();
	});

	
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