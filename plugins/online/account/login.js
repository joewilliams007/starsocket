let fs = require('fs');

function login(message, results){

    var args = message.split(" ") 
    var loginMessage;
    var res = JSON.parse(JSON.stringify(results))

    try {
        
        //-- Save Message         		
        loginMessage = "%SPORTDASH%"+args[1]+"%SPORTDASH%"+args[2]+"%SPORTDASH%"
        +res[0].username+"%SPORTDASH%"
        +res[0].xp+"%SPORTDASH%"
        +res[0].age+"%SPORTDASH%"
        +res[0].weight+"%SPORTDASH%"
        +res[0].coins+"%SPORTDASH%"
        +res[0].energy+"%SPORTDASH%"

        /* +" PLANS "
        +res[0].plan1+" "
        +res[0].plan2+" "
        +res[0].plan3+" "
        +res[0].plan4+" "
        +res[0].plan5
        +" PROGRESS "
        +res[0].todayProgress+" "
        +res[0].weekProgress+" "
        +res[0].day+" "
        +res[0].week+" "
        +res[0].login_streak+" "
        +res[0].last_login+" "
        +res[0].logins+" "
        +res[0].theme+" "
        +res[0].error_styles+" "
        +res[0].log 
        */
        
    } catch (err) {
        loginMessage = "WRONG"
    }

    return loginMessage;
}
module.exports = login;