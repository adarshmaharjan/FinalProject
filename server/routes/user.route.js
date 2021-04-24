const router = require('express').Router();
const {
    registerUser,
    loginUser,
    verifyUser,
    resetPasswordLogged,
    resetPasswordLink,
    passwordResetToken
} = require('../controllers/user.controller.js');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/verify').get(verifyUser);
router.route('/resetPassword/logged/:id').patch(resetPasswordLogged);
router.route('/resetPassword/link').patch(resetPasswordLink);
router.route('/resetPassword/link/verify/:token').patch(passwordResetToken);

module.exports = router;
