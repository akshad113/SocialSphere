const User = require('../models/user')
module.exports.profile = async function(req,res){
    try {
        const user = await User.findById(req.params.id)
        res.render('users_profile',{title:'users profile',profile_user: user});
        
    } catch (error) {
        console.log("Error while finding user in profile")
        return res.redirect('back');
    }
}
module.exports.update = async function(req,res){
    try {
        await User.findByIdAndUpdate(req.params.id,{name:req.body.user_name,email:req.body.user_email});
        return res.redirect('back');
        
    } catch (error) {
        console.log("Error while updating profile ", error);
        return res.redirect("back");
    }
}
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    res.render('users_sign_in',{title:'login page'});
}

module.exports.signUp = function(req,res){ 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    res.render('users_sign_up',{title:'create account'});
}
module.exports.create = async function(req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('/users/sign-up');
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create(req.body);
            return res.redirect('/');
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.error("Error while creating user:", error);
        return res.redirect('back');
    }
};

module.exports.createSession = function(req,res){
    
    req.flash('success','Logged in Successfully');
    return res.redirect("/");
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
            return res.redirect('back');
        }
        req.flash('success',"You have Logged out")
        return res.redirect('/')

    });

}