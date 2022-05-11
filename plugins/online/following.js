let fs = require('fs');

function follower (id) {

    var message;
    try {
        var foll = fs.readFileSync('./users/'+id+'/following.txt');
        message = foll.toString().split('#').length-1;
    } catch (err) {
        message = "0"
    }

return message;
}

module.exports = follower;