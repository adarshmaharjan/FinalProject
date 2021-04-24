const router = require('express').Router();
const {ADD_NOTIFICATION, DELETE_NOTIFICATION, FETCH_NOTIFICATION}= require('../controllers/postNotification.controller'); 

router.route('/add/notification/:id').post(ADD_NOTIFICATION);
router.route('/delete/notification/:id').delete(DELETE_NOTIFICATION);
router.route('/notification/:id').get(FETCH_NOTIFICATION);


module.exports = router;

