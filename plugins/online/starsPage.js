let fs = require('fs');

function stars (res) {

    var message="";
					
			for (const item of res.values()) {  
					message+="\n"+JSON.stringify(item.user_id)+"@"+JSON.stringify(item.username)+"@"+"-";
			}
       
return message;
}

module.exports = stars;