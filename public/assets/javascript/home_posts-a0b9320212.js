{let e=function(){let e=$("#new-post-form");e.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:e.serialize(),success:function(e){console.log(e);let o=n(e.data.post);$("#post-list-container>div").prepend(o),t($(".delete-post-button",o)),new postComments(e.data.post._id),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Post Created!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))},n=function(e){return $(`\n      <div class="card m-4" id="post-${e._id}">\n      <div class="card-header">\n          <div class="d-flex flex-row justify-content-between">\n              <div class="d-flex flex-row profile-info">\n                  <h3 class="profile-pic-holder" style="width: 55px; height: 55px; margin: 0px 5px;">\n\n                  ${e.user.avatar?`<img src="${e.user.avatar}" alt="image" style = "width: 100%;height: 100%; border-radius: 50px;"alt="image">`:'<img src="/images/codeial-default-avatar2.png" style = "width: 100%;height: 100%; border-radius: 50px;" alt="image">'}\n                      \n                          \n                      \n                  </h3>\n                  <h4 class="text-capitalize profile-name-holder">\n                      ${e.user.name}\n                  </h4>\n              </div>\n              \n              <div class="dropdown dropleft">\n                  <a class="dropdown-toggle" type="button" id="dropdownMenuButton-${e._id}"data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                      <i class="fas fa-ellipsis-v"></i>\n                  </a>\n                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton-${e._id}">\n                     \n                          <a class="delete-post-button dropdown-item" href="/posts/destroy/${e._id}">Delete</a>\n                     \n                  </div>\n              </div>\n          </div>\n      </div>\n      <div class="card-body">\n          \n              <p>\n                  <small>\n                      ${e.content}\n                  </small>\n                  <br>\n                  <small>\n                  </small>\n              </p>   \n              \n          \n      </div>\n     \n          \n          <div class="card-footer text-muted d-flex flex-row">\n              <div class="mx-2">\n                  \n                      \n                          <a class = "toggle-like-button" data-likes = "${e.likes.length}" href="/likes/toggle/?id=${e._id}&type=Post" style="text-decoration: none;">\n                              ${e.likes.length} <i class="far fa-thumbs-up"></i>\n                          </a>  \n                           \n                  \n              </div>\n              <div class="mx-2">\n                  <button class="btn btn-link btn-block" type="button" data-toggle="collapse" \n              data-target="#post-${e._id}-collapse" aria-expanded="true" aria-controls="collapseOne" style="width:140px; text-decoration: none; padding-top: 2px;">\n                  <h4 style="font-size: 1rem; margin-left: -20px;">\n                      <i class="fas fa-comment"></i>\n                      Comments\n                  </h4>\n                  </button>\n              </div>    \n          </div>\n              <div id="post-${e._id}-collapse" class="collapse card-footer" aria-labelledby="headingOne">\n                  <div class="card-body">\n                      <div>\n                          \n                              <form action="/comments/create" method="POST" id="post-${e._id}-comments-form">\n                                  <input type="text" name="content" placeholder="Type here to comment">\n                                  <input type="hidden" name="post" value="${e._id}">\n                                  <input type="submit" value="Add">\n                              </form>\n                          \n                      </div> \n                  \n                          \n                      <div class="post-comments-list">\n                          <ul id="post-comments-${e._id}" style="list-style-type: none; padding: 0px;">\n                              \n                          </ul>\n                      </div>\n                  </div>\n              </div>\n          \n          \n    </div>\n      `)},t=function(e){$(e).click((function(n){n.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){console.log(e),$("#post-"+e.data.post_id).remove()},error:function(e){console.log(e.responseText)}})}))},o=function(){$("#post-list-container>div>div").each((function(){let e=$(this),n=$(" .delete-post-button",e);t(n);let o=e.prop("id").split("-")[1];new postComments(o)}))};e(),o()}