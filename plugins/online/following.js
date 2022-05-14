let fs = require('fs');

function follower (res) {

    var message="";
					
			for (const item of res.values()) {  
					message+="\n"+JSON.stringify(item.follower_id)+"@"+JSON.stringify(item.follower_name)+"@"+"-";
                
                    console.log(JSON.stringify(item.follower_id))
                    console.log("-.-")
			}
       
        

return message;
}

module.exports = follower;