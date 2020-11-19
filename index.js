const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("new user");
    socket.emit("user-prompt", "enter username  :");
    socket.on("return-user", (message, user_color) => {
        socket.broadcast.emit("new-user-joined", message, user_color);
    });
    socket.on("send-chat-message", (message, user, user_color) => {
        socket.broadcast.emit("chat-message", message, user, user_color);
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
