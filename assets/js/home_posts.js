{
    // method to submit the form data for new post using Ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost)
                    deletePost($('delete-post-button',newPost));
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    } 
    // methos to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                    
                    <small>
                        <a class="delete-post-button" href="/posts/destory/${post._id}">X</a>
                    </small>
                    ${post.content}
                    <small>${post.user.name}</small>
                    </p>
                    <div class="post-comment">
                    
                    <form action="/comments/create" method="POST">
                        <input
                        type="text"
                        name="content"
                        placeholder="Type here to add comment ..."
                        id=""
                        required
                        />
                        <input type="hidden" name="post" value="${post._id}" />
                        <input type="submit" value="comment" />
                    </form>
                    
                    <div class="post-comment-list">
                        <ul id="post-comments-${post._id}">
                       
                        </ul>
                    </div>
                    </div>
                 </li>
      `)
     }
    
    // method to delte the post for doc
    $(document).on('click', '.delete-post-button', function(e) {
        e.preventDefault();
    
        let deleteLink = $(this);
    
        $.ajax({
            type: 'get',
            url: deleteLink.attr('href'),
            success: function(data) {
                $(`#post-${data.data.post_id}`).remove();
            },
            error: function(error) {
                console.log(error.responseText);
            }
        });
    });
    

    createPost();
}