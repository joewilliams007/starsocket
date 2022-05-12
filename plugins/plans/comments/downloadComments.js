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

            if (Number(JSON.stringify(item.xp))<1){

            } else {
                
            position++
                    //	console.log(`Cache item: ${JSON.stringify(item)}`)
                    if (position>100){
                    } else {
                        comments += res[position].creator_name+" #"
                        +res[position].creator_id+"@"
                        +res[position].comment+"@"
                        +res[position].comment_id+" // "
                        +res[position].date+" // "
                        +res[position].likes+"NEXTMESSAGEIS:;"
                    }
            }
        }


       
    } catch (err) {
        comments = "err"
    }

    return comments;
}
module.exports = downloadComments;