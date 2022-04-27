let fs = require('fs');

function ipFolder(ip){

	var dir = "./user_messages/"+ip;

	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
		
		fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
			if (err) throw err;
			console.log('Saved!');
		  });
	}
	
	var _messages;
	try {
	_messages = JSON.parse(fs.readFileSync("./user_messages/"+ip+"/messages.json"));
	} catch (err){
		try {
		fs.unlinkSync("./user_messages/"+ip+"/messages.json")
		fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
			if (err) throw err;
			console.log('new messages created!');
			try {
			_messages = JSON.parse(fs.readFileSync("./user_messages/"+ip+"/messages.json"));
		} catch (err){
			fs.unlinkSync("./user_messages/"+ip+"/messages.json")
			fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
				if (err) throw err;
			})
		}
		
		});
		} catch (err){

		}	  
	}

    return _messages;

}
module.exports = ipFolder;