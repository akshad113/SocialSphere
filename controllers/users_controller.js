module.exports.profile = function(req,res){
    res.render('users_profile',{title:'users profile'});
}

module.exports.signIn = function(req,res){
    res.render('users_sign_in',{title:'login page'});
}

module.exports.signUp = function(req,res){
    res.render('users_sign_up',{title:'create account'});
}