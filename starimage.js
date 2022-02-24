var net = require('net');
let fs = require('fs')
const _images = JSON.parse(fs.readFileSync('./images.json'));	
const {exec} = require('child_process');
const { finished } = require('stream');
var server = net.createServer();
console.log('Started Server.');


var server = net.createServer(function(socket) {
	console.log("New Connection")

	var count = _images.length;
	lastImage = _images[Number(count) - 1]	
	socket.write(lastImage);

	socket.on('data', function(chunk) {
		
		console.log("Data arrived. Storing in File.")

		  //-- Save Message
		  console.log(chunk.toString())    

		  exec(`rm -rf ./images.json`);
		 
		  fs.appendFile(`./images.json`, `["${chunk.toString().replace(/\n/g,'')}"]`, function (err) {				
		  if (err) throw err;
		  });

		  _images.push(chunk.toString())
		  fs.writeFileSync('./images.json', JSON.stringify(_images))
	

	});
	
	socket.on('end', function() {
		// console.log('Closing connection with the client');
		 socket.destroy()
	});

	socket.on('error', function(err) {
		// console.log(`Error: ${err}`);
	});
});


server.listen(4754);

/*/ function to encode file data to base64 encoded string
file = "./image.jpg"
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer.from(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
} 

// convert image to base64 encoded string
var base64str = base64_encode('image.jpg');
console.log(base64str);
console.log("finished");
*/