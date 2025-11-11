const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("a user connected");

  // Store user identity when they join
  socket.on("join", ({ name, color }) => {
    socket.data.user = { name, color };
  });

  // Broadcast messages with structured data
  socket.on("chat message", (m) => {
    io.emit("chat message", m);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


// Change HERE:
http.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://0.0.0.0:3000");
});
