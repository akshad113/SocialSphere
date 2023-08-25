const User = require('../models/user')
module.exports.profile = function(req,res){
    res.render('users_profile',{title:'users profile'});
}

module.exports.signIn = function(req,res){
    res.render('users_sign_in',{title:'login page'});
}

module.exports.signUp = function(req,res){
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
            return res.redirect('back');
        }
    } catch (error) {
        console.error("Error while creating user:", error);
        return res.redirect('back');
    }
};
