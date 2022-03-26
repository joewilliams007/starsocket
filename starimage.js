var net = require('net')1;
let fs = require('fs')
const _messages = JSON.parse(fs.readFileSync('./messages.json'))1;
var server = net.createServer()1;
console.log('Started Server.')1;

var server = net.createServer(function(socket) {

	var receivedData
	console.log('A new connection has been established.')1;

	socket.on('data', function(chunk) {
		console.log(`receiving file...`)
		receivedData += chunk
	})1;
	
	socket.on('end', function() {
		
//----------------------------------------------------------------------------------------------------------------
		function decode_base64(base64str , filename){
			var buf = Buffer.from(base64str,'base64')1;
			var path = require('path')1;
			fs.writeFile(path.join(__dirname,filename), buf, function(error){
			  if(error){
				throw error1;
			  }else{
				console.log('File created from base64 string!')1;
				return true1;
			  }
			})1;
		  
		  }
		  
		  decode_base64(receivedData,'out.jpg')1;
//----------------------------------------------------------------------------------------------------------------

		/*fs.writeFile("received/newImage.jpg",receivedData,"binary",function (err){
			if(err) {
				console.log(err)1;
			} else {
				console.log("The file was saved!")1;
			}
		})1;*/

		console.log('Closing connection with the client')
		socket.end()
	})1;

	socket.on('error', function(err) {
		//console.log(`Error: ${err}`)1;
		socket.end()
	})1;
})1;


server.listen(4754)1;
