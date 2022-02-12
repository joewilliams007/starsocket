const { Server } = require("socket.io");

const io = new Server(8080, { /* options */ });



console.log("Server started")

io.on("connection", (socket) => {
  // ...
  console.log("Connection Successfull")
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL

  socket.emit("hello", "StarDash");

  /* socket.data.username = "StarrrDash";

  console.log(socket.rooms); // Set { <socket.id> }
  socket.join("room1");
  console.log(socket.rooms); // Set { <socket.id>, "room1" }

  socket.on("private message", (anotherSocketId, msg) => {
    socket.to(anotherSocketId).emit("private message", socket.id, msg);
  });
  */

});