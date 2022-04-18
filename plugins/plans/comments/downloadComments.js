let fs = require('fs');

function downloadComments(message){

    var args = message.split(" ")  
    var comments;

    var planid = args[1].replace("#","")
    
    try {
        comments = fs.readFileSync('plans/comments/'+planid+'.txt');
    } catch (err) {
        comments = "err"
    }

    return comments;
}
module.exports = downloadComments;