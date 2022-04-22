let fs = require('fs');

function search(message, results){

    var args = message.split(" ") 
    var loginMessage;
    var res = JSON.parse(JSON.stringify(results))

    try { 		
        searchMessage = 
        res[0].element_name+"@"
        +res[0].description+"@"
        +res[0].duration+"@"
        +res[0].type+"@"
        +res[0].element_usage+"@"
        +res[0].reports+"@"
        +res[0].creator_name+"@"
        +res[0].creator_id+"@"
    } catch (err) {
        searchMessage = "no results"
    }

    return searchMessage;
}
module.exports = search;