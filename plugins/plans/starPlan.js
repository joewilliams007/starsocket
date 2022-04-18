let fs = require('fs');

function starPlan (planid) {

var stars = fs.readFileSync('plans/stars/'+planid+'.txt');
var message = stars.toString().split('#').length-1;

return message;
}

module.exports = starPlan;