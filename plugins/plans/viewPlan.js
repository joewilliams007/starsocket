let fs = require('fs');

function viewPlan (planid) {

    var message;
    try {
        var views = fs.readFileSync('plans/views/'+planid+'.txt');
        message = views.toString().split('#').length-1;
    } catch (err) {
        message = "0"
    }

return message;
}

module.exports = viewPlan;