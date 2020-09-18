

module.exports.userChats = async function(req,res){

    try{
        return res.render('chats',{
            title : 'chats'
        })
    }catch(err){
        console.log('ERROR',err);
        return;
    }

    


}