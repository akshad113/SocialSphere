const Post = require('../models/post')

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