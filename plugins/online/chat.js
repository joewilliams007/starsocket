let fs = require('fs');

function chat(message){

    var args = message.split(" ")

    var FROM = args[1]
	var TO =  args[2]

	var username = message.toString().split("MESSAGE&")[2]
	var datetime = new Date();
	var date = datetime.toISOString().slice(0,10)
	var time1 = datetime.toLocaleTimeString().split(":");
	var time2 = datetime.toLocaleTimeString().split(" ");
	var time = time1[0]+":"+time1[1]+" "+time2[1]
	var chatM = message.toString().split("MESSAGE&")[1]

	var finalMessageChat = time+"@"+username+"@"+chatM+"NEXTMESSAGEIS:;"
	var finalMessageChatInbox = time+"@"+username+" #"+FROM+"@"+chatM+"NEXTMESSAGEIS:;"

	try{
            fs.appendFile("./users/"+TO+"/chatinbox.txt","\n"+finalMessageChatInbox, function (err) {
                if (err) {
                    // append failed
                } else {
                    // done
                }
                })

                var dir = "./chat/"+TO;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir, { recursive: true });
                }


                var dir = "./chat/"+FROM;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir, { recursive: true });
                }

                fs.appendFile("./chat/"+TO+"/"+FROM+".txt","\n"+finalMessageChat, function (err) {
                if (err) {} else {}
                })

                
                fs.appendFile("./chat/"+FROM+"/"+TO+".txt","\n"+finalMessageChat, function (err) {
                if (err) {} else {}
                })

    }catch (err){}

    return message;
}
module.exports = chat;