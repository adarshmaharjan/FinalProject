const router = require('express').Router();

const {searchPost,getLatest} = require('../controllers/search.controller'); 

router.route('/search-post').post(searchPost);
router.route('/latest-post').get(getLatest);

module.exports = router;
