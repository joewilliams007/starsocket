var net = require('net');
let fs = require('fs')
const _messages = JSON.parse(fs.readFileSync('./messages.json'));
var server = net.createServer();
console.log('Started Server.');

var server = net.createServer(function(socket) {

	var receivedData
	console.log('A new connection has been established.');

	socket.on('data', function(chunk) {
		console.log(`receiving file...`)
		receivedData += chunk
	});
	
	socket.on('end', function() {
		
//----------------------------------------------------------------------------------------------------------------
		function decode_base64(base64str , filename){
			var buf = Buffer.from(base64str,'base64');
		  
			fs.writeFile(path.join(__dirname,filename), buf, function(error){
			  if(error){
				throw error;
			  }else{
				console.log('File created from base64 string!');
				return true;
			  }
			});
		  
		  }
		  
		  decode_base64(receivedData,'out.jpg');
//----------------------------------------------------------------------------------------------------------------

		/*fs.writeFile("received/newImage.jpg",receivedData,"binary",function (err){
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");
			}
		});*/

		console.log('Closing connection with the client')
		socket.end()
	});

	socket.on('error', function(err) {
		//console.log(`Error: ${err}`);
		socket.end()
	});
});


server.listen(4754);
