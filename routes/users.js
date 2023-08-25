const expess = require('express');
const router =  expess.Router();
const userController = require('../controllers/users_controller')

router.get('/profile',userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

module.exports = router;