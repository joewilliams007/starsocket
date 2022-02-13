var socket = require('socket.io')();
var users = {
    desktop : {},
    android : {}
}
socket.on('connection',function(client){
    console.log(`new connection ! ${client.id}`);
    client.on('intro',(user)=>{

            user.client = client ;
            user.cid = client.id ;
            users[user.type] = user ;

            console.log('users '+users);
    })
});
socket.listen(8080)
console.log(`app running`);