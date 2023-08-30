const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function (req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            console.log("User not found");
            return res.redirect('back');
        }
        res.render('users_profile', { title: 'User Profile', profile_user: user });
    } catch (error) {
        console.log("Error while finding user in profile:", error);
        return res.redirect('back');
    }
};

module.exports.update = async function (req, res) {
    try {
        User.uploadedAvatar(req, res, async function (err) {
            if (err) {
                console.log("Error in multer", err);
            }
            
            let user = await User.findById(req.params.id);

            if (!user) {
                console.log("User not found");
                return res.redirect("back");
            }

            // Get the old avatar path
            const oldAvatarPath = user.avatar;

            // Update user fields
            user.name = req.body.name;
            user.email = req.body.email;

            if (req.file) {
                // Check if the old avatar file exists before deleting
                if (user.avatar && fs.existsSync(path.join(__dirname, "..", user.avatar))) {
                    fs.unlinkSync(path.join(__dirname, "..", user.avatar));
                }
                // Update the avatar path with the new file
                user.avatar = User.avatarPath + "/" + req.file.filename;
            }

            await user.save(); // Save the updated user

            // Redirect to the profile page
            return res.redirect('back');
        });
    } catch (error) {
        console.log("Error while updating profile ", error);
        return res.redirect("back");
    }
};

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    res.render('users_sign_in', { title: 'Login Page' });
};

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    res.render('users_sign_up', { title: 'Create Account' });
};

module.exports.create = async function (req, res) {
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

module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
            return res.redirect('back');
        }
        req.flash('success', "You have logged out");
        return res.redirect('/');
    });
};