const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Router is setup and running");
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comment'))
router.use('/api',require('./api/index'))
module.exports = router; 