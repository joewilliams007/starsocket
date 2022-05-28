let fs = require('fs');

function feed(type, results){

    var feed;
    var res = JSON.parse(JSON.stringify(results))
    var separator = "PLAN_DIVIDER"


    var startDate = new Date();
// Do your operations
var endDate   = new Date();
var seconds = (endDate.getTime() - startDate.getTime()) / 1000;

    try {

        for (const item of res.values()) {  

                
        
            if (type == "all_time") {
                feed += item.plan_name+separator
                +item.plan_description+separator
                +item.tags+separator
                +item.plan_views+separator
                +item.plan_stars+separator
                +item.plan_id+separator
                +(endDate.getTime() - Number(item.date)) / 1000+separator
                +"\n"
            }

        }




    } catch(err){
        feed = "err"
    }



    return feed;
}
module.exports = feed;