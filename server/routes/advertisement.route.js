const router = require('express').Router();
const {addRoomPost, addHousePost, testPost}= require('../controllers/advertise.controller');

router.route('/addRoom').post(addRoomPost);
router.route('/addHouse').post(addHousePost);
// router.route('/deletePost').post(deletePost);

module.exports = router;
