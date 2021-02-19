const router = require('express').Router();
const {
    UPDATE_USER_INFO,
    USER_PROFILE_INFO,
    UPDATE_USER_POST,
    USER_PROFILE_POST,
    DELETE_USER_POST,
    ANSWER_USER_COMMENTS
} = require('../controllers/profile.controller');


router.route('/post/:id').get(USER_PROFILE_POST);
router.route('/info/:id').get(USER_PROFILE_INFO);
router.route('/updatepost/:id').put(UPDATE_USER_POST);
router.route('/updateUser/:id').put(UPDATE_USER_INFO);
router.route('/deletepost/:id').delete(DELETE_USER_POST);
router.route('/loadComment/:id').get(ANSWER_USER_COMMENTS);


module.exports = router
