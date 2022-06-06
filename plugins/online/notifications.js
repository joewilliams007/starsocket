let fs = require('fs');
function notif(results){

    var notif;
    var res = JSON.parse(JSON.stringify(results))
    var separator = "NOTIF_DIVIDER"


    var dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds

    try {
        console.log("NEW ITEM")
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

           
        notif += item.type+separator
                +item.from_id+separator
                +item.from_name+separator
                +item.plan_id+separator
                +item.notification_text+separator
                +item.viewed +separator
                +finalTime+
                +item.notif_id +separator
                +"\n"
        }

    } catch(err){
        notif = "err"
    }
    console.log(notif)
    return notif;
}
module.exports = notif;