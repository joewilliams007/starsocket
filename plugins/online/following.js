let fs = require('fs');

function follower (res) {

    var message ="";
	var position = 0
		
     try {
			for (const item of res.values()) {  
              
				message+="\n"+JSON.stringify(item.follower_id)+"@"+JSON.stringify(item.follower_name)+"@"+"-";

                                
                console.log(JSON.stringify(item.follower_id))
                console.log("-.-")
   
			}
        } catch(err){

        }
        

return message;
}

module.exports = follower;