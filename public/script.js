const socket = io();
console.log("hey user");
const message_container = document.querySelector(".message-container");
const send_btn = document.querySelector("#send-message");
const mess_box = document.querySelector("#inputText1");
let user = "";
let color_class_list = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "info",
    "dark",
];
let user_color =
    color_class_list[Math.floor(Math.random() * color_class_list.length)];
send_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const message = mess_box.value;
    mess_box.value = "";
    if (message.length != 0) {
        message_container.innerHTML += `<div class="alert alert-${user_color}" role="alert">
    ${user + ":" + message}
    </div>`;
        socket.emit("send-chat-message", message, user, user_color);
    }
});

/*  <div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
  </div> */
// socket.on("chat-message", (data) => {
//     console.log(data);
// });
socket.on("user-prompt", (message) => {
    user = prompt("enter username:");
    socket.emit("return-user", user + " joined!", user_color);
});
socket.on("new-user-joined", (message, user_color) => {
    message_container.innerHTML += `<div class="alert alert-${user_color}" role="alert">
    ${message}
    </div>`;
});
socket.on("chat-message", (message, user, user_color) => {
    message_container.innerHTML += `<div class="alert alert-${user_color}" role="alert">
    ${user + ":" + message}
    </div>`;
});
