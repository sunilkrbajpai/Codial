const Comment=require('../models/comment');
const Post=require('../models/posts');
const commentmailer=require('../mailers/comment_mailer');

module.exports.create=async function(req,res)
{
    try{
    let post=await Post.findById(req.body.post);

    if(post)
        {
            let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
                //hanfle err

                post.comments.push(comment)
                post.save();

                comment=await comment.populate('user','name email').execPopulate();
                commentmailer.newComment(comment);
                if(req.xhr)
                {
                    return res.status(200).json({
                        data:{
                            comment:comment
                        },
                        message:"Post created!"
                    });
                }
                req.flash('success','Comment Published!');
                res.redirect('/');
        }
    }catch(err){
        req.flash('err',err);
        return;
    }
}

module.exports.destroy=async function(req,res){

    try{
        let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id)
        {
            let postId=comment.post;
            comment.remove();
            let post= await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
            req.flash('success','Comment deleted!');
                return res.redirect('back');
        }else{
            req.flash('error','Comment not deleted!');

            return res.redirect('back');
        }

    }
    catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');
    }
    
}