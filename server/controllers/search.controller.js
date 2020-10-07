const Room = require('../models/rooms.model');
const recommend = require('../middleware/contentFiltering.middleware');


const searchPost = ((req,res)=>{
    //search is based on the price, location and the facilities the the person is looking for.
    Room.find({location:req.body.location})
        .then(async data => {
            let arr = new Array(data.length).fill(0)
            let arr2 = [];
            const list = await recommend(data,req.body);
            console.log("this is recommendation" ,list);
            list.map(value=>{
                arr2.push(value.id); 
            })
            data.map((data)=>{
                index = arr2.indexOf(data.id);
                arr[index] = data;
            })
            console.log('this is sorted recommendation',arr);
            res.json(arr);
            
        })
        .catch(err=> console.log(err));

})

module.exports = searchPost;
