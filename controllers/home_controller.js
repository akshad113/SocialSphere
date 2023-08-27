const Post = require('../models/post')
module.exports.home = async function(req,res){
    
    
    try {
        const posts = await Post.find({}).populate('user').populate({
            path:'comment',
            populate:{
                path:'user'
            }

        });
        // console.log(posts)
        return res.render('home',{title : "codeSphere",posts:posts})

    } catch (error) {
        console.log("Error while searching posts in db",error)
    }
} 