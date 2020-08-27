const router = require('express').Router();
const House = require('./models/house.model.js');
const Room = require('./models/room.model.js');

const addPost = (req, res, next) => {
  //req has the following values [category, Title, Description, photos,location,coordinates]
  next();
};
