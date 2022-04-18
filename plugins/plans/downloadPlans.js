let fs = require('fs');

function downloadPlans(message){

    var args = message.split(" ")    
    var plan;    

        try {

                let plan1 = fs.readFileSync("./users/"+args[1]+"/plan1.txt");
                let plan2 = fs.readFileSync("./users/"+args[1]+"/plan2.txt");
                let plan3 = fs.readFileSync("./users/"+args[1]+"/plan3.txt");
                let plan4 = fs.readFileSync("./users/"+args[1]+"/plan4.txt");
                let plan5 = fs.readFileSync("./users/"+args[1]+"/plan5.txt");

                //-- Save Message         		
                plan = " ##########"
                +plan1+"##########"
                +plan2+"##########"
                +plan3+"##########"
                +plan4+"##########"
                +plan5+"##########"

		} catch (err) {
            plan = "err"
		}

        return plan;
}
module.exports = downloadPlans;