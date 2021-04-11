const router = require('express').Router();

const {searchPost,getLatest, searchOne} = require('../controllers/search.controller'); 

router.route('/search-post').post(searchPost);
router.route('/latest-post').get(getLatest);
router.route('/post/:id/:type').get(searchOne);

module.exports = router;
