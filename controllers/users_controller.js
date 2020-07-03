module.exports.profile = function(req,res){
   return res.render('user_controller',{
       title : "profile"
   });
}