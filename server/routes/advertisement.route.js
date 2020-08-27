const router = require('express').Router();
const {addPost, deletePost} = require('./controller/advertise.controller.js');

router.route('/addPost').post(addPost);
router.route('/deletePost').post(deletePost);

module.exports = router;
