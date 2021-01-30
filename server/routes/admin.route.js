const router = require('express').Router();
const {HouseFetch, RoomFetch, DeletePost, FetchRoomByLocation, FetchHouseByLocation}= require('../controllers/admin.controller'); 

router.route('/fetch-house/:id').get(HouseFetch);
router.route('/fetch-room/:id').get(RoomFetch);
router.route('/post-delete/:id').delete(DeletePost);
router.route('/house-location/:id').get(FetchHouseByLocation);
router.route('/room-location/:id').get(FetchRoomByLocation);



module.exports = router;
