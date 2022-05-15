let fs = require('fs');

function profile(message, results, follows, followers){

    var args = message.split(" ") 
    var profile;
    var res = JSON.parse(JSON.stringify(results))


    try {

        var date = res[0].account_created.split("-");
        var day = Number(date[2].split("T")[0])+1
        var month = date[1]
        var year = date[0]


        profile = args[1]+"ROFILE_OF_USER"
        +res[0].username+"ROFILE_OF_USER"
        +res[0].xp+"ROFILE_OF_USER"
        +res[0].today_progress+"ROFILE_OF_USER"
        +res[0].week_progress+"ROFILE_OF_USER"
        +res[0].age+"ROFILE_OF_USER"
        +res[0].weight+"ROFILE_OF_USER"
        +">_<"+"ROFILE_OF_USER"
        +day+"."+month+"."+year+"ROFILE_OF_USER"
        +followers+"ROFILE_OF_USER"
        +follows+"ROFILE_OF_USER"
        +res[0].bio+"ROFILE_OF_USER"
      //  +res[0].active_style+" "

       
    } catch (err) {
        profile = "err"
    }

    return profile;
}
module.exports = profile;