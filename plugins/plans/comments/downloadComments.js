/*let fs = require('fs');

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
module.exports = downloadComments;*/


let fs = require('fs');

function downloadComments(message, results){

    var args = message.split(" ") 
    var comments;
    var res = JSON.parse(JSON.stringify(results))


    try {

        comments = res[0].creator_name+" #"
        +res[0].creator_id+"@"
        +res[0].comment+"@"
        +res[0].comment_id+" // "
        +res[0].date+" // "
        +res[0].likes

       
    } catch (err) {
        comments = "err"
    }

    return comments;
}
module.exports = downloadComments;