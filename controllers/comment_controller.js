const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = async function(req,res){
    try {
       const post = await Post.findById(req.body.post)
       if(post){
        const comment =await Comment.create({
            content: req.body.content,
            post:req.body.post,
            user:req.user._id
        })
        post.comment.push(comment);
        post.save();
       }
       return res.redirect('/');
    } catch (error) {
        console.log("Error while creating comment",error);
    }
}


module.exports.destroy = async function(req,res){
    try {
        const comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            await comment.deleteOne();

            await Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}});
            return res.redirect('back');
        }
    } catch (error) {
        console.log("Error while deleting comment",error);
        return res.redirect('back');
    }

}