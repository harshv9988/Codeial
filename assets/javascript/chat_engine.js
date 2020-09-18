class ChatEngine{
    constructor(chatBoxId,userId){
        this.chatBox = $(`#${chatBoxId}`);
        this.userId = userId;

        this.socket = io.connect('http://localhost:5000');

        if(this.userId){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        this.socket.on('connect',function(){
            console.log("Connection established using sockets...!");
        })
    }
}