const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            });
            post.comments.push(comment);
            post.save();

            if(req.xhr){
                // comment = await Comment.find({}).sort('-createdAt')
                comment = await Comment.findById(comment._id).populate('user','name');
                return res.status(200).json({
                    data : {
                        comment : comment
                    },
                    message : 'Comment created'
                });
            }
            
            req.flash('success','Comment Created');
            return res.redirect('/');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('/');
    }
   
}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();
            
            await Post.findByIdAndUpdate(postId,{$pull : {comments : req.params.id}});

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        comment_id : req.params.id
                    },
                    message : "Comment Deleted"
                });
            }

            req.flash('success','Comment deleted!');
            return res.redirect('back');

                // Post.findByIdAndDelete({comments:req.params.id},function(err,post){
                //     return res.redirect('back');
                // })
            
        }
        else{
            req.flash('error','Not authorized to delete this comment');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}