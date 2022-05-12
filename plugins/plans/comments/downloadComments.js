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
    var position = 0;

    try {

        for (const item of res.values()) {  
        
            try {
                comments += res[position].creator_name+" #"
                +res[position].creator_id+"@"
                +res[position].comment+"@"
                +res[position].likes+"\n "
                +res[position].comment_id+" // "
                +res[position].date+
                "NEXTMESSAGEIS:;"
                position++
            } catch (err) {
             
            }
        }


       
    } catch (err) {
        comments = "err"
    }

    return comments.replace("undefined","");
}
module.exports = downloadComments;