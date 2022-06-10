let fs = require('fs');

function profile(message, results, follows, followers, stars,plans){

    var args = message.split(" ") 
    var profile;
    var res = JSON.parse(JSON.stringify(results))


    try {

        var date = res[0].account_created.split("-");
        var day = Number(date[2].split("T")[0])+1
        var month = date[1]
        var year = date[0]
        var separator = "PROFILE_OF_USER";

        profile = args[1]+separator
        +res[0].username+separator
        +res[0].xp+separator
        +res[0].today_progress+separator
        +res[0].week_progress+separator
        +res[0].age+separator
        +res[0].weight+separator
        +">_<"+separator
        +day+"."+month+"."+year+separator
        +followers+separator
        +follows+separator
        +res[0].bio+separator
        +stars+separator
        +plans+separator
      //  +res[0].active_style+" "

       
    } catch (err) {
        profile = "err"
    }

    return profile;
}
module.exports = profile;