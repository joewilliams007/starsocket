let fs = require('fs');

function profile(message, results){

    var args = message.split(" ") 
    var profile;
    var res = JSON.parse(JSON.stringify(results))


    try {

        var date = res[0].account_created.split("-");
        var day = Number(date[2].split("T")[0])+1
        var month = date[1]
        var year = date[0]


        profile = args[1]+" "
        +res[0].username+" "
        +res[0].xp+" "
        +res[0].today_progress+" "
        +res[0].week_progress+" "
        +res[0].age+" "
        +res[0].weight+" "
        +">_<"+" "
        +day+"."+month+"."+year
        +res[0].followers+" "
        +res[0].follows+" "
      //  +res[0].active_style+" "

       
    } catch (err) {
        profile = "err"
    }

    return profile;
}
module.exports = profile;