let fs = require('fs');

function search(message, results){

    var args = message.split(" ") 
    var loginMessage;
    var res = JSON.parse(JSON.stringify(results))

    try { 		
 
  
        for(var i = 0; i < 10;i++){
           
               searchMessage += res[i].element_name+"@"
                +res[i].description+"@"
                +res[i].duration+"@"
                +res[i].type+"@"
                +res[i].element_usage+"@"
                +res[i].reports+"@"
                +res[i].creator_name+"@"
                +res[i].creator_id+"\n"
            
         }
    
  
  
    } catch (err) {
        searchMessage = "no results"
    }

    return searchMessage;
}
module.exports = search;