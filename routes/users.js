const expess = require('express');
const router =  expess.Router();
const userController = require('../controllers/users_controller')

router.get('/profile',userController.profile);


module.exports = router;