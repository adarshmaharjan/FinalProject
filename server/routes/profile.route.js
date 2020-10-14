const router = require('express').Router();
const {
    UPDATE_USER_INFO,
    USER_PROFILE_INFO,
    UPDATE_USER_POST,
    USER_PROFILE_POST,
    DELETE_USER_POST
} = require('../controllers/profile.controller');


router.route('/post/:id').get(USER_PROFILE_POST);
router.route('/info/:id').get(USER_PROFILE_INFO);
router.route('/updatepost/:id').put(UPDATE_USER_POST);
router.route('/updateUser/:id').put(USER_PROFILE_INFO);
router.route('/deletepost/:id').put(DELETE_USER_POST);

module.exports = router
