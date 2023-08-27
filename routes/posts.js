const express = require('express');
const passport = require('../config/passport_local')
const router = express.Router();

const postController = require('../controllers/post_controller')


router.post('/create',passport.checkAuthentication,postController.create);


module.exports =router;