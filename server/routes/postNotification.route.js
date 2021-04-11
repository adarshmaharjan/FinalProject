const router = require('express').Router();
const {ADD_NOTIFICATION}= require('../controllers/postNotification.controller'); 

router.route('/add/notification/:id').post(ADD_NOTIFICATION);


module.exports = router;

