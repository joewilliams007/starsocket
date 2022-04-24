function shop(message){
   
    var args = message.split(" ")  
    var shop;
    var codeVersion = args[1]

    if (Number(codeVersion)<1){
        shop = "outdated-app"
    } else {
    
    var item1 = "-_-"
    var desc1 ="s t e v e"
    var coins1 = "20"
    var id1 = "1" 
    
    var item2 = "<_<"
    var desc2 ="f r a n k"
    var coins2 = "25"
    var id2 = "2" 
    
    var item3 = "~_~"
    var desc3 ="h u a n"
    var coins3 = "30"
    var id3 = "3" 
    
    var item4 = "1"
    var desc4 ="l i g h t  b o x"
    var coins4 = "100"
    var id4 = "box1" 
    
    var item5 = "2"
    var desc5 ="g r e e n s t a r  b o x"
    var coins5 = "200"
    var id5 = "box2" 
    
    
    function beforeMidnight(){
        var mid= new Date(), 
        ts= mid.getTime();
        mid.setHours(24, 0, 0, 0);
        return Math.floor((mid - ts)/60000);
    }
      
    shop =
    
    `${beforeMidnight()/60}h${beforeMidnight()}
${item1}!-${desc1}!-${coins1}!-${id1}
${item2}!-${desc2}!-${coins2}!-${id2}
${item3}!-${desc3}!-${coins3}!-${id3}
${item4}!-${desc4}!-${coins4}!-${id4}
${item5}!-${desc5}!-${coins5}!-${id5}`
                
    }

    return shop;
}
module.exports = shop;