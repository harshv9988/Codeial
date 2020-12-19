const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    user : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    messages : {
        type : String
    }
})

const Chat = mongoose.model('Chat',chatSchema);
module.exports = Chat;