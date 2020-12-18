var socket = io.connect("http://localhost:5000");
socket.on("connect", function () {
  console.log("connection established using sockets...!");
});

function sendroomdata(roomId, userId) {
  socket.emit("join_room", {
    user_email: userId,
    chatroom: roomId,
  });

  socket.on("user_joined", function (data) {
    console.log("New User Joined", data);
  });

  if (roomId === "codeial1") {
    $("#chat-room-display1").css("display", "block");
    $("#chat-room-display2").css("display", "none");
  } else {
    $("#chat-room-display2").css("display", "block");
    $("#chat-room-display1").css("display", "none");
  }

  $(".send-message").click(function () {
    if (roomId === "codeial1") {
      var msg = $("#chat-room-display1 .chat-message-input").val();
    } else {
      var msg = $("#chat-room-display2 .chat-message-input").val();
    }

    if (msg != "") {
      self.socket.emit("send_message", {
        message: msg,
        user_email: userId,
        chatroom: roomId,
      });
    }
  });

  self.socket.on("receive_message", function (data) {
    console.log("message received", data.message);

    let newMessage = $("<li>");
    let messageType = "other-message";

    if (data.user_email === userId) {
      messageType = "self-message";
    }

    if (messageType == "self-mssage") {
      newMessage.append(`
                    <div>
                        <h3> ${data.message} </h3>
                        <h4> ${data.user_email} </h4>
                    </div>
                `);
    } else {
      newMessage.append(`
                <div>
                    <h3> ${data.message} </h3>
                    <h4> ${data.user_email} </h4>
                </div>
            `);
    }

    // newMessage.append($('<span>', {
    //     'html': data.message
    // }));

    // newMessage.append($('<sub>', {
    //     'html': data.user_email
    // }));

    newMessage.addClass(messageType);
    if (data.chatroom === "codeial1") {
      $("#chat-room-display1 .chat-messages-list").append(newMessage);
    } else {
      $("#chat-room-display2 .chat-messages-list").append(newMessage);
    }
  });
}

$(".chats").each(function () {
  $(this).click(function () {
    let roomId = $(this).attr("data-roomid");
    let userId = $(this).attr("data-userid");
    sendroomdata(roomId, userId);
  });
});

// class ChatEngine{
//     constructor(chatBoxId,userId){
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userId = userId;

//         this.socket = io.connect('http://15.207.84.232:5000');

//         if(this.userId){
//             this.connectionHandler();
//         }
//     }

//     connectionHandler(){
//         let self = this;

//         this.socket.on('connect',function(){
//             console.log("Connection established using sockets...!");

//             self.socket.emit('join_room',{
//                 user_email : self.userId,
//                 chatroom : 'codeial'
//             });

//             self.socket.on('user_joined',function(data){
//                 console.log('New User Joined',data);
//             });

//         });

//         $('#send-message').click(function(){
//             let msg = $('#chat-message-input').val();

//             if(msg!=''){
//                 self.socket.emit('send_message',{
//                     message : msg,
//                     user_email : self.userId,
//                     chatroom : 'codeial'
//                 });
//             }
//         });

//         self.socket.on('receive_message',function(data){
//             console.log('message received', data.message);

//             let newMessage = $("<li>");
//             let messageType = 'other-message';

//             if(data.user_email==self.userId){
//                 messageType = 'self-message';
//             }

//             if(messageType=='self-mssage'){
//                 newMessage.append(`
//                     <div>
//                         <h3> ${data.message} </h3>
//                         <h4> ${data.user_email} </h4>
//                     </div>
//                 `);
//             }
//             else{
//                 newMessage.append(`
//                 <div>
//                     <h3> ${data.message} </h3>
//                     <h4> ${data.user_email} </h4>
//                 </div>
//             `);
//             }

//             // newMessage.append($('<span>', {
//             //     'html': data.message
//             // }));

//             // newMessage.append($('<sub>', {
//             //     'html': data.user_email
//             // }));

//             newMessage.addClass(messageType);

//             $('#chat-messages-list').append(newMessage);
//         })
//     }
// }
