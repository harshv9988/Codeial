
class postComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        // let self = this;
        // $('.delete-comment-button',self.postContainer).each(function(){
        //     self.deleteComment($(this)); //reminder to print $this
        // });
    }

    createComment(postId){
        let globalSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : $(self).serialize(),
                success : function(data){
                    console.log(data);
                    let newComment = globalSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    newCommentDom(comment){
        return $(`
        <li id="comment-${comment._id}">
        <p>
            
                <p>
                    <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                </p>    
            
            ${comment.content}
            <small>
                ${comment.user.name}
            </small>
        </p>    
    </li>
        `)
    }
}