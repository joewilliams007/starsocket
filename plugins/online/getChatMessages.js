let fs = require('fs');

function getChat(message){

    var args = message.split(" ")

    var userid = args[1]
    var chatId = args[2]
    
    try{
        var chat = fs.readFileSync("./chat/"+userid+"/"+chatId+".txt");
    }catch (err){}

    return chat;
}
module.exports = getChat;