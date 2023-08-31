const Post = require('../../../models/post')
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