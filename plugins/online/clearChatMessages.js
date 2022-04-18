let fs = require('fs');

function clearChat(message){
    var args = message.split(" ")

    var userid = args[1]
	var chatId = args[2]

	fs.unlinkSync("./chat/"+userid+"/"+chatId+".txt")
	fs.appendFile("./chat/"+userid+"/"+chatId+".txt", '', function (err) {
	
        if (err) throw err;
		console.log('cleared chat');
	});
}
module.exports = clearChat;