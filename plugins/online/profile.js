let fs = require('fs');

function profile(message, res){

    var args = message.split(" ") 
    var profile;

    try {
        profile = args[1]+" "
        +res[0].username+" "
        +res[0].xp+" "
        +res[0].today_progress+" "
        +res[0].week_progress+" "
        +res[0].age+" "
        +res[0].weight+" "

       
    } catch (err) {
        profile = "err"
    }

    return profile;
}
module.exports = profile;