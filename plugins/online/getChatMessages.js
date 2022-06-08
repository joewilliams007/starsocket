let fs = require('fs');
function notif(results){

    var notif;
    var res = JSON.parse(JSON.stringify(results))
    var separator = "CHAT_DIVIDER"


    try {
        for (const item of res.values()) {  
           
        notif += item.message_id+separator
                +item.text+separator
                +item.to_id+separator
                +item.from_id+separator
                +item.viewed+separator
                +item.edited+separator
                +item.deleted+separator
                +item.date+separator
                +item.type+separator
                +item.from_name+separator
                +"NEXTTEXTMESSAGE"
        }

    } catch(err){
        notif = "err"
    }

    return notif;
}
module.exports = notif;