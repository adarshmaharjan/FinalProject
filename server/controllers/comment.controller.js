const router = require('express').Router();
const Comment = require('../models/chat.model');

const addComment = async(req,res,next) => {
    console.log('comment is added');     
}

const ansComment = async(req,res,next) => {
    console.log('comment is being answered');
}

module.exports = { addComment , ansComment};



