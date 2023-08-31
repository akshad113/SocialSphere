const Post = require('../../../models/post')
const Comment = require('../../../models/comment')
module.exports.index = async function(req,res){

    const posts = await Post.find({}).populate('user').populate({
        path:'comment',
        populate: 'user'
    });


    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
}
 
module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        await post.deleteOne();
        await Comment.deleteMany({ post: req.params.id });

        return res.status(200).json({
            message: "Post and associated comments deleted!"
        });
    } catch (error) {
        console.log("## Error while destroying the post: ", error);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
};
