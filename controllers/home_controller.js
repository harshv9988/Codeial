const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){
    // Post.find({},function(err,post){
    //     if(err){
    //         console.log('error in fetching');
    //         return;
    //     }
    //     return res.render('home',{
    //         title:"codeial home",
    //         posts : post
    //     });
    // })

    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err,post){
        if(err){
                    console.log('error in fetching');
                    return;
                }

                User.find({},function(err,user){
                    return res.render('home',{
                        title:"codeial home",
                        posts : post,
                        all_users : user
                    });
                })
                
    })
}