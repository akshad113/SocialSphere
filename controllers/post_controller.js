const Post = require('../models/post')
const Comment = require('../models/comment')
module.exports.create = async function (req, res) {

    try {
        // console.log("user is ",req.user);
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        })

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'post created',
            })
        }

        req.flash('success', 'Post created successfully'); // Flash success message
        return res.redirect('back')
    } catch (error) {
        console.log("Error while creating post ", error);
        return res.redirect('back');
    }

}

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            await post.deleteOne();
            await Comment.deleteMany({ post: req.params.id });
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"post deleted"
                })
            }


            req.flash('success', 'Post and comments deleted successfully');
            return res.redirect('back');
        }else{
            console.log("You cannot delete this post");
            return res.redirect('back');
        }

    } catch (error) {
        console.log('Error while deleting the post', error);
        return res.redirect('back');
    }
};
