var sockett = require('socket.io')();

sockett.on('connection',function(client){
    console.log(`new connection ! ${client.id}`);

});
sockett.listen(8080)
console.log(`app running`);

const { io } = require("socket.io-client");
const socket = io(); // same server
// const socket = io("https://server-domain.com"); // different site

// client-side
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
  
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });


