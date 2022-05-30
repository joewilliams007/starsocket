let fs = require('fs');

function feed(type, results){

    var feed;
    var res = JSON.parse(JSON.stringify(results))
    var separator = "PLAN_DIVIDER"


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

           
                feed += item.plan_name+separator
                +item.plan_description+separator
                +item.tags+separator
                +item.plan_views+separator
                +item.plan_stars+separator
                +item.plan_id+separator
                +finalTime+separator
                +item.creator_name+separator
                +"\n"
            

        }




    } catch(err){
        feed = "err"
    }



    return feed;
}
module.exports = feed;