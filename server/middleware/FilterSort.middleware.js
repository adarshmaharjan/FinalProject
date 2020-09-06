const router = require('express').Router();
const Room = require('../models/rooms.model');


/**
 * FilterSort.
 *
 * @param {} coordinate:<array>
 * @param {} location:<array>
 */
const FilterSort = async (coordinate, location) => {
    Room.find({location:location})
}

