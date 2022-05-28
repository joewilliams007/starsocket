let fs = require('fs');

function boost(ip){
    try {

        fs.unlinkSync("./user_messages/"+ip+"/messages.json")
        fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
            if (err) throw err;
            console.log('ACCOUNT BOOSTED!');
            _messages = JSON.parse(fs.readFileSync("./user_messages/"+ip+"/messages.json"));
        });

    } catch (err){
        console.log("error boosting")

        fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
            if (err) throw err;
            console.log('ACCOUNT BOOSTED!');
            _messages = JSON.parse(fs.readFileSync("./user_messages/"+ip+"/messages.json"));
        });
    }
}
module.exports = boost;