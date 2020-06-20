{
    let createPost=function(){
        let newPostform=$('#new-post-form');
        newPostform.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostform.serialize(),
                success:function(data)
                {
                    let newpost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newpost);        
                },
                error:function(error)
                {
                    console.log(error.responseText);
                }
            });
        });
    }


    let newPostDom=function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                                    <small>
                                            <a class="post--delete-btn" href="/posts/destroy/${post.id}">X</a>
                                    </small>

                                    ${post.content}
                                    <br>
                                    <small>${post.user.name}</small>
                                    <small>${post.user.createdAt}</small>
                                    
                    </p>
                    <div class="post-comments">

                    <form action="/comments/create" method="POST">
                                                    <input type="text" name="content" placeholder="type here..." required>
                                                    <input type="hidden" name="post" value="${post._id}">
                                                    <input type="submit" value="Add comment">
                                            </form>

                                            <div class="posts-comments-list">
                                                    <ul id="posts-comments-${post._id}">

                                                    </ul>
                                            </div>
                    </div>
            </li>`)
    }
    createPost();
}