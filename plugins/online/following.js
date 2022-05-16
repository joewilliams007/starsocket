let fs = require('fs');

function follower (res) {

    var message="";
					
			for (const item of res.values()) {  
					message+="\n"+JSON.stringify(item.target_id)+"@"+JSON.stringify(item.target_name)+"@"+"-";
                
        
			}
       
        

return message;
}

module.exports = follower;