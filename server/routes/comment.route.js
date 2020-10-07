const router = require('express').Router();
const {addComment,ansComment}= require('../controllers/comment.controller'); 

router.route('/addComment').post(addComment);
router.route('/ansComment').post(ansComment);


module.exports = router;
