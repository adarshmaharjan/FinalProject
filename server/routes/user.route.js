const router = require('express').Router();
const {
    registerUser,
    loginUser,
    verifyUser,
} = require('../controllers/user.controller.js');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/verify').get(verifyUser);

module.exports = router;
