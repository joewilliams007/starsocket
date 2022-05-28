let fs = require('fs');

function downloadPlanById(message){

    var args = message.split(" ")    
    var plan;    

        try {
            plan = fs.readFileSync('plans/allplans/'+args[1]+'.txt');
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+args[1])
		} catch (err) {
            plan = "err"
		}

        return plan;
}
module.exports = downloadPlanById;