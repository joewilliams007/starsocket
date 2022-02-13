const io = require("socket.io") (8080);
console.log("Server started")


io.on("connection", (socket) => {
  // ...
  console.log("Connection Successfull")
  
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
 

});