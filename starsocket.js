const { Server } = require("socket.io");

const io = new Server(3000, { /* options */ });

console.log("Server started")

io.on("connection", (socket) => {
  // ...
  console.log("Connection Successfull")
});