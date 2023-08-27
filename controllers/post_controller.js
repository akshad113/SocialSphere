const Post = require('../models/post')
const Comment = require('../models/comment')
module.exports.create = async function(req,res){
    
    try {
        // console.log("user is ",req.user);
        await Post.create({
            content:req.body.content,
            user:req.user._id,
        })
        return res.redirect('back')
    } catch (error) {
        console.log("Error while creating post ",error);
        return res.redirect('back');
    }

}

module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            if (post.user == req.user.id) {
                await post.deleteOne();

                try {
                    await Comment.deleteMany({ post: req.params.id });
                    return res.redirect('back');
                } catch (error) {
                    console.log('Error while deleting multiple comments in post', error);
                    return res.redirect('back');
                }
            }
        }
    } catch (error) {
        console.log('Error while deleting the post', error);
        return res.redirect('back');
    }
};
