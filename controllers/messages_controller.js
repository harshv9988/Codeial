const User = require('../models/user');

module.exports.userChats = async function(req,res){

    try{

        let signInUserFriends;
        if(req.user){
         signInUserFriends = await User.findById(req.user._id)
         .populate('friendship', 'name email avatar');
        }

        return res.render('chats',{
            title : 'chats',
            friends : signInUserFriends
        })
    }catch(err){
        console.log('ERROR',err);
        return;
    }  


}

module.exports.chatRoom = async function(req,res){

   try{
       if(req.xhr){
        return res.status(200).json({
            data: {
            },
            message: "SUCCESS h bhai"
         }); 
       }

   }catch(err){
    console.log('ERROR',err);
    return;
   }


}