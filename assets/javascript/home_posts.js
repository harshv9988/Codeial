{   
    //-------------------------creating post-----------------------------------------------------
    // console.log('hey');
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button',newPost));
                    new Noty({
                        theme: 'relax',
                        text: "Post Created!",
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

    let newPostDom = function(post){
        return $(`
            <li id="post-${post._id}">
            <p>
                
                    <p>
                        <a class="delete-post-button" href="/posts/destroy/${post._id }">X</a>
                    </p>    
                
                ${ post.content }
                <small>
                    ${post.user.name}
                </small>
            </p>   
            <div>
            
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Type here to comment">
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
                
            </div> 
        
                
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                    
                </ul>
            </div>
        
        </li>
        
            `)
        }

        //----------------------------------deleting post-------------------------------------

        let deletePost = function(deleteLink){
            $(deleteLink).click(function(e){
                e.preventDefault();

                $.ajax({
                    type : 'get',
                    url : $(deleteLink).prop('href'),
                    success : function(data){
                        console.log(data);
                        $(`#post-${data.data.post_id}`).remove();
                    },
                    error : function(error){
                        console.log(error.responseText);
                    }
                });
            });
        }

    createPost();
}