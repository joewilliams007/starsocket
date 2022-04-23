let fs = require('fs');

function starPlan (planid) {

    var message;
    try {
        var stars = fs.readFileSync('plans/stars/'+planid+'.txt');
        message = stars.toString().split('#').length-1;
    } catch (err) {
        message = "0"
    }

return message;
}

module.exports = starPlan;