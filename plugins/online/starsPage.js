let fs = require('fs');

function stars (res) {

    var message="";
					
			for (const item of res.values()) {  
					message+="\n"+JSON.stringify(item.plan_id)+"@"+JSON.stringify(item.plan_name)+"@"+"-";
			}
       
return message;
}

module.exports = stars;