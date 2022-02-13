const io = require("socket.io") (3000, {
  cors: {
    origin: ["http://localhost:8080"],
  },
});
console.log("Server started")


io.on("connection", (socket) => {
  // ...
  console.log("Connection Successfull")
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  socket.emit("hello", "world");

});