class postComments{constructor(e){this.postId=e,this.postContainer=$("#post-"+e),this.newCommentForm=$(`#post-${e}-comments-form`),console.log("called",e),this.createComment(e);let t=this;$(".delete-comment-button",t.postContainer).each((function(){t.deleteComment($(this))}))}createComment(e){let t=this;this.newCommentForm.submit((function(n){n.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(n){console.log(n);let o=t.newCommentDom(n.data.comment);$("#post-comments-"+e).prepend(o),t.deleteComment($(".delete-comment-button",o)),new ToggleLike($(".toggle-like-button",o)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}newCommentDom(e){return $(`\n        <li id="comment-${e._id}">\n        <div class="media m-2 border-bottom">\n            <h3 class="profile-pic-holder" style="width: 55px; height: 55px; margin: 0px 5px;">\n\n                ${e.user.avatar?`<img src="${e.user.avatar}" alt="image"  style = "width: 100%;height: 100%; border-radius: 50px;">`:'<img src="/images/codeial-default-avatar2.png" style = "width: 100%;height: 100%; border-radius: 50px;" alt="image">'}\n                \n                   \n                \n            </h3>\n    \n    \n            <div class="media-body">\n                <div class="d-flex flex-row justify-content-between" style="height: 22px; width: 150px;">\n                    <div class="comment-user-name">\n                        <h5 class="mt-0" style = " font-size: medium;text-transform: capitalize;">${e.user.name}</h5>\n                    </div>\n                    <div>\n                        \n                            <p>\n                                <a class="delete-comment-button" href="/comments/destroy/${e._id}">X</a>\n                            </p>    \n                        \n                    </div>\n                </div>\n    \n               <div class="comment-content" style="font-size: small; width: 260px;">\n                ${e.content}\n               </div>\n                <small>\n                   \n                        \n                            <a class = "toggle-like-button" data-likes =  "${e.likes.length}" href="/likes/toggle/?id=${e._id}&type=Comment" style="text-decoration: none;">\n                                ${e.likes.length} <i class="far fa-thumbs-up"></i>\n                            </a>   \n                   \n                </small>\n            </div>\n        </div>  \n    </li>\n        `)}deleteComment(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){console.log(e),$("#comment-"+e.data.comment_id).remove()},error:function(e){console.log(e.responseText)}})}))}}