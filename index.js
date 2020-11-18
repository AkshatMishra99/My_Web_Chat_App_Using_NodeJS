const io = require("socket.io")(3000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"],
    },
});
const app = require("express");

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
