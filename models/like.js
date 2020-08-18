const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId
    },
    //this defines object ID of liked object
    likeable : {
        type :  mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel'
    }, //this defines the type of object ID whether on POst os comment
    onModel : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        enum : ['Post','Comment']
    }
},{
    timestamps : true
});

const Like = mongoose.model('Like',postSchema);
module.exports = Like;