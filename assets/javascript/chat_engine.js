let chatArea = $('.chat-room-display');
let selfUser;
let userMail;
let otherUser;
let currentChatRoom;
let roomList = [];

var socket = io.connect("http://localhost:5000");
socket.on("connect", function () {
  console.log("connection established using sockets...!");
});


function joinRoom(){
    socket.emit('join_room',{
      user_email : userMail,
      chatroom : currentChatRoom
    });

    socket.on('user_joined',function(data){
      console.log('New User Joined',data);
  });
}


function activateMessageSending(){

  let inputBox = $('.chat-message-input');
  let msg = inputBox.val();

  if(msg!=''){
    socket.emit('send_message',{
        message : msg,
        user_id : selfUser._id,
        user_email : userMail,
        chatroom : currentChatRoom
    });

    inputBox.val('.send-message').click();
}


}

function connectRoom(){
  if(!roomList.includes(currentChatRoom)){
    joinRoom();
    roomList.push(currentChatRoom);
  }
}

$('.send-message').click(activateMessageSending);

function createArea(){
  return ` <div class="user-chat-box">
            <ul class="chat-messages-list"></ul>
            <div class="chat-message-input-container">
                <input class="chat-message-input" placeholder="Type message here" />
                <button class="send-message">
                  <i class="fas fa-paper-plane"></i>
                </button>
            </div>
          </div>`
}


$(".chat-list").each(function () {
  $(this).click(function () {
   const friendId =  $(this).attr('data-friendId');

   $.ajax({
     type : 'GET',
     url : `/messages/chatroom?friend=${friendId}`,

     success : function(data){
       let {chatRoom, friend, user} = data.data;
       let room = createArea();
       chatArea.empty();
       chatArea.append(room);

      selfUser = user;
      otherUser = friend;
      currentChatRoom = chatRoom._id;
      userMail = user.email;

      connectRoom();

     },
     error: function (error) {
      console.log(error.responseText)
    },
   })
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
