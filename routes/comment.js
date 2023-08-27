const express = require('express');
const passport = require('../config/passport_local')
const router = express.Router();

const commentController = require('../controllers/comment_controller');

router.post('/create',passport.checkAuthentication,commentController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);

module.exports =router;
