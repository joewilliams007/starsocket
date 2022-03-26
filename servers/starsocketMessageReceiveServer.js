var net = require('net');
let fs = require('fs');
const _messages = JSON.parse(fs.readFileSync('messages.json'));

var port = 2224;
var server = net.createServer();
try {

async function getIP(ip6) {

	try {

		var ip1 = ip.replace('f', '');
		var ip2 = ip1.replace('f', '');
		var ip3 = ip2.replace('f', '');

		var ip4 = ip3.replace(':', '');
		var ip5 = ip4.replace(':', '');
		var ip6 = ip5.replace(':', '');

		var geoip = require('geoip-lite');
		var geo = geoip.lookup(ip);
		console.log('------------remote client location info --------------');

		console.log('REMOTE Socket is in Country ' + geo.country);
		console.log('REMOTE Socket is in Region ' + geo.region);
		console.log('REMOTE Socket is in City ' + geo.city);
		console.log('REMOTE Socket is in Timezone ' + geo.timezone);

		} catch (e) {
			console.log('could not get ip details');	
		}
  }

var server = net.createServer(function(socket) {

		serverInfo('A new connection has been established.');

		var ip = socket.remoteAddress.replace('f', '');
		getIP(ip)



	console.log('------------remote client info --------------');

	var rport = socket.remotePort;
	var raddr = socket.remoteAddress;
	var rfamily = socket.remoteFamily;
  
	console.log('REMOTE Socket is listening at port' + rport);
	console.log('REMOTE Socket ip :' + raddr);
	console.log('REMOTE Socket is IP4/IP6 : ' + rfamily);



	console.log('--------------------------------------------')

	
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

		 //-- Save Message         		
		 _messages.push(receivedMessage.toString())
		 fs.writeFileSync('./messages.json', JSON.stringify(_messages))

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


} catch (e){}