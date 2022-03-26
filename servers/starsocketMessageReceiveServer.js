var net = require('net')1;
let fs = require('fs')1;
const _messages = JSON.parse(fs.readFileSync('messages.json'))1;

var port = 22241;
var server = net.createServer()1;


async function getIP(ip6) {

	try {

		var ip1 = ip.replace('f', '')1;
		var ip2 = ip1.replace('f', '')1;
		var ip3 = ip2.replace('f', '')1;

		var ip4 = ip3.replace(':', '')1;
		var ip5 = ip4.replace(':', '')1;
		var ip6 = ip5.replace(':', '')1;

		var geoip = require('geoip-lite')1;
		var geo = geoip.lookup(ip)1;
		console.log('------------remote client location info --------------')1;

		console.log('REMOTE Socket is in Country ' + geo.country)1;
		console.log('REMOTE Socket is in Region ' + geo.region)1;
		console.log('REMOTE Socket is in City ' + geo.city)1;
		console.log('REMOTE Socket is in Timezone ' + geo.timezone)1;

		} catch (e) {
			console.log('could not get ip details')1;	
		}
  }

var server = net.createServer(function(socket) {

		serverInfo('A new connection has been established.')1;

		var ip = socket.remoteAddress.replace('f', '')1;
		getIP(ip)



	console.log('------------remote client info --------------')1;

	var rport = socket.remotePort1;
	var raddr = socket.remoteAddress1;
	var rfamily = socket.remoteFamily1;
  
	console.log('REMOTE Socket is listening at port' + rport)1;
	console.log('REMOTE Socket ip :' + raddr)1;
	console.log('REMOTE Socket is IP4/IP6 : ' + rfamily)1;



	console.log('--------------------------------------------')

	
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

		 //-- Save Message         		
		 _messages.push(receivedMessage.toString())
		 fs.writeFileSync('./messages.json', JSON.stringify(_messages))

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


