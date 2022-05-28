let fs = require('fs');

function feed(type, results){

    var feed;
    var res = JSON.parse(JSON.stringify(results))
    var separator = "PLAN_DIVIDER"


        if (type == "all_time") {
            feed = res[0].plan_name+separator
            +res[0].description+separator
            +res[0].tags+separator
            +res[0].plan_views+separator
            +res[0].plan_stars+separator
            +res[0].plan_id+separator
        }




    return feed;
}
module.exports = feed;