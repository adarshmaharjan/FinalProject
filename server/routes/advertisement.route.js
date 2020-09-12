const router = require('express').Router();
const {addRoomPost, addHousePost, testPost}= require('../controllers/advertise.controller');

router.route('/addRoom').post(addRoomPost);
router.route('/addHouse/:id').post(addHousePost);
router.route('/test').post(testPost);
// router.route('/deletePost').post(deletePost);

module.exports = router;
