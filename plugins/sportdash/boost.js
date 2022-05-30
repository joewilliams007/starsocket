let fs = require('fs');

function boost(ip){
    try {
       finalBoost(ip); 
    } catch (err){
        finalBoost(ip); 
    }
}

function finalBoost(ip) {
    fs.unlink("./user_messages/"+ip+"/messages.json", (err => {
        if (err) {
            console.log(err);
            boost(ip)
        } else {
            fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
                if (err) throw err;
                console.log('ACCOUNT BOOSTED!');
                _messages = JSON.parse(fs.readFileSync("./user_messages/"+ip+"/messages.json"));
            });
        }
      }));
}
module.exports = boost;