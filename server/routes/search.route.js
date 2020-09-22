const router = require('express').Router();

const searchPost = require('../controllers/search.controller'); 

router.route('/search-post').post(searchPost);

module.exports = router;
