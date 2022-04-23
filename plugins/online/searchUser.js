let fs = require('fs');

function search(message, results){

    var args = message.split(" ") 
    var searchMessage;
    var res = JSON.parse(JSON.stringify(results))

    try { 		
 
  
        for(var i = 0; i < 10 ;i++){

            try {
           
               searchMessage += res[i].user_id+"@"
                +res[i].username+"@"
                +res[i].error_style+">_<\n"
                console.log(res[i].username)

            } catch (err) {
                console.log(i)
            }
            
         }
    
  
  
    } catch (err) {
        searchMessage = "no results"
    }

    return searchMessage;
}
module.exports = search;