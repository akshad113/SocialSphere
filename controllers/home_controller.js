const Post = require('../models/post')
const User = require("../models/user")
module.exports.home = async function(req,res){
    
    
    try {
        const posts = await Post.find({}).populate('user').populate({
            path:'comment',
            populate:{
                path:'user'
            }

        });
        const users = await User.find({}); 
        
        return res.render('home',{title : "codeSphere",posts:posts,all_users:users})

    } catch (error) {
        console.log("Error while searching posts in db",error)
    }
} 