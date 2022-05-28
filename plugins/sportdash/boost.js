let fs = require('fs');

function boost(ip){
    try {

        fs.unlinkSync("./user_messages/"+ip+"/messages.json")
        await sleep(1000);
        fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
            if (err) throw err;
            console.log('ACCOUNT BOOSTED!');
            _messages = JSON.parse(fs.readFileSync("./user_messages/"+ip+"/messages.json"));
        });

    } catch (err){
        console.log("error boosting")


        try {

            fs.unlinkSync("./user_messages/"+ip+"/messages.json")
            await sleep(1000);
            fs.appendFile("./user_messages/"+ip+"/messages.json", '[]', function (err) {
                if (err) throw err;
                console.log('ACCOUNT BOOSTED!');
                _messages = JSON.parse(fs.readFileSync("./user_messages/"+ip+"/messages.json"));
            });
    
        } catch (err){
            console.log("error boosting")
        }

    }
}




function sleep(ms) {
return new Promise((resolve) => {
  setTimeout(resolve, ms);
});
}
module.exports = boost;