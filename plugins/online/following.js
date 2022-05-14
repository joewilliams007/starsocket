let fs = require('fs');

function follower (res) {

    var message ="";
	var position = 0
					
			for (const item of res.values()) {  
				message+="\n"+JSON.stringify(item.follower_id)+"@"+JSON.stringify(item.follower_name)+"@"+"-";
			}

            console.log(res.values)



return message;
}

module.exports = follower;