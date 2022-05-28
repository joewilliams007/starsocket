let fs = require('fs');

function feed(type, results){

    var feed;
    var res = JSON.parse(JSON.stringify(results))
    var separator = "PLAN_DIVIDER"


    var dateInSec = Math.floor(new Date().getTime() / 1000) // in seconds

    try {

        for (const item of res.values()) {  

        finalTime;
        var time = (dateInSec - Number(item.date))

        if(time/60/60/24>364) {

            finalTime = time/60/60/24/365+" years ago"

        } else if(time/60/60/24>30) {

            finalTime = time/60/60/24/30+" months ago"

        } else if (time/60/60/60>23.55){

            finalTime = time/60/60+" days ago"

        } else if (time/60/60>55){

            finalTime = time/60/60+" hours ago"

        } else if (time/60>0.55) {

            finalTime = time/60+" minutes ago"

        } else {
            finalTime = time+" seconds ago"
        }

           
                feed += item.plan_name+separator
                +item.plan_description+separator
                +item.tags+separator
                +item.plan_views+separator
                +item.plan_stars+separator
                +item.plan_id+separator
                +finalTime+separator
                +"\n"
            

        }




    } catch(err){
        feed = "err"
    }



    return feed;
}
module.exports = feed;