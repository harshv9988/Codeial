var socket=io.connect("http://localhost:5000");function sendroomdata(s,e){socket.emit("join_room",{user_email:e,chatroom:s}),socket.on("user_joined",(function(s){console.log("New User Joined",s)})),"codeial1"===s?($("#chat-room-display1").css("display","block"),$("#chat-room-display2").css("display","none")):($("#chat-room-display2").css("display","block"),$("#chat-room-display1").css("display","none")),$(".send-message").click((function(){if("codeial1"===s)var a=$("#chat-room-display1 .chat-message-input").val();else a=$("#chat-room-display2 .chat-message-input").val();""!=a&&self.socket.emit("send_message",{message:a,user_email:e,chatroom:s})})),self.socket.on("receive_message",(function(s){console.log("message received",s.message);let a=$("<li>"),o="other-message";s.user_email===e&&(o="self-message"),"self-mssage"==o?a.append(`\n                    <div>\n                        <h3> ${s.message} </h3>\n                        <h4> ${s.user_email} </h4>\n                    </div>\n                `):a.append(`\n                <div>\n                    <h3> ${s.message} </h3>\n                    <h4> ${s.user_email} </h4>\n                </div>\n            `),a.addClass(o),"codeial1"===s.chatroom?$("#chat-room-display1 .chat-messages-list").append(a):$("#chat-room-display2 .chat-messages-list").append(a)}))}socket.on("connect",(function(){console.log("connection established using sockets...!")})),$(".chats").each((function(){$(this).click((function(){sendroomdata($(this).attr("data-roomid"),$(this).attr("data-userid"))}))}));