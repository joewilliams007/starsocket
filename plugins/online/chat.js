function chat(message){

    var args = message.split(" ")

    var FROM = args[1]
	var to =  args[2]
	var username = message.toString().split("MESSAGE&")[2]
	var datetime = new Date();
	var date = datetime.toISOString().slice(0,10)
	var time1 = datetime.toLocaleTimeString().split(":");
	var time2 = datetime.toLocaleTimeString().split(" ");
	var time = time1[0]+":"+time1[1]+" "+time2[1]
	var chatM = message.toString().split("MESSAGE&")[1]
	var finalMessage = "- - - - -\n"+date+" "+time+" by user #"+FROM+"\n- "+chatM
	var finalMessageChat = time+"@"+username+"@"+chatM+"NEXTMESSAGEIS:;"

	serverInfo(finalMessage)

	try{
            fs.appendFile("./users/"+to+"/chatinbox.txt","\n"+finalMessage, function (err) {
                if (err) {
                    // append failed
                } else {
                    // done
                }
                })

                var dir = "./chat/"+to;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir, { recursive: true });
                }
                var dir = "./chat/"+FROM;
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir, { recursive: true });
                }

                fs.appendFile("./chat/"+to+"/"+FROM+".txt","\n"+finalMessageChat, function (err) {
                if (err) {} else {}
                })
                fs.appendFile("./chat/"+FROM+"/"+to+".txt","\n"+finalMessageChat, function (err) {
                if (err) {} else {}
                })

            serverInfo("saving message to #"+to+" from "+FROM)
    }catch (err){}

    return message;
}
module.exports = changelog;