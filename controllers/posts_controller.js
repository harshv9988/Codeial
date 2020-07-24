const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content : req.body.content,
            user  : req.user._id
        });

       

        console.log(post);
        if(req.xhr){
            post = await Post.findById(post._id).populate('user');
            return res.status(200).json({
                data : {
                    post : post
                },
                message : 'Post created'
            });
        }
        req.flash('success','Post Created');
        return res.redirect('back');

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        //.id is used instead of ._id so that it can be converted into string
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post : req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id
                    },
                    message : "Post Deleted"
                });
            }
            req.flash('success','Post and All associated comments deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error','Not authorized to delete this post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
   
}