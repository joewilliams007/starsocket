let fs = require('fs');

function activity(results){

    var activity;
    var res = JSON.parse(JSON.stringify(results))
    var separator = "LOGIN_DIVIDER"


    var dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds

    try {

        for (const item of res.values()) {  

        var finalTime;
        var time = (dateInSec - Number(item.date))

        if(time/60/60/24>364) {

            finalTime = time/60/60/24/365+". year(s) ago"

        } else if(time/60/60/24>30) {

            finalTime = time/60/60/24/30+". month(s) ago"

        } else if (time/60/60/24>1){

            finalTime = time/60/60/24+". day(s) ago"

        } else if (time/60/60>1){

            finalTime = time/60/60+". hour(s) ago"

        } else if (time/60>1) {

            finalTime = time/60+". minute(s) ago"

        } else {
            finalTime = time+".. second(s) ago"
        }

           
        activity += item.ip+separator
                +"From "+item.country+" "+item.country_code+" near "+item.city+separator
                +item.signup+separator
                +item.finalTime+separator
                +"\n"
            

        }

    } catch(err){
        activity = "err"
    }

    return activity;
}
module.exports = activity;