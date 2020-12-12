const Room = require("../models/rooms.model.js");
const User = require("../models/user.model");
const { cloudinary } = require("../config/cloudinary");

/**
 * USER_PROFILE_POST.
 *
 * @param {} req [id of the user logged in ]
 * @param {} res [json format of data]
 */
const USER_PROFILE_POST = (req, res) => {
    try {
        Room.find({ createdBy: req.params.id }).then((data) => {
            if (data) {
                res.json(data);
                console.log(data);
            }
        });
    } catch (e) {
        res.json("There seems to be some problem try refreshing your page");
    }
};

/**
 * USER_PROFILE_INFO.
 *
 * @param {} req
 * @param {} res
 */
const USER_PROFILE_INFO = (req, res) => {
    User.findById(req.params.id).then((data) => {
        res.json(data);
    });
};

/**
 * UPDATE_USER_INFO.
 *
 * @param {} req
 * @param {} res
 */
const UPDATE_USER_INFO = (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, { data }).then((data) => {
        res.json({ message: "updated" });
        res.json(data);
    });
};

/**
 * UPDATE_USER_POST.
 *
 * @param {} req
 * @param {} res
 */
const UPDATE_USER_POST = (req, res) => {
    Room.findByIdAndUpdate({ _id: req.params.id }, { data }).then((data) => {
        res.json({ message: "Post successfully updated" });
        res.json(data);
    });
};

/**
 * DELETE_USER_POST.
 *
 * @param {} req [post request that contains the id of post to be deleted]
 * @param {} res
 */
const DELETE_USER_POST = (req, res) => {
    console.log(req.params.id);
    Room.findByIdAndDelete(req.params.id)
        .then((data) => {
            console.log(data);
            data.imageCollection.map((id) => {
                cloudinary.uploader.destroy(id, (error, result) =>
                    console.log(result, error)
                );
            });
        })
        .then(() => res.json("post deleted"))
        .catch((err) => res.status(404).json("error" + err));
};

module.exports = {
    USER_PROFILE_POST,
    USER_PROFILE_INFO,
    UPDATE_USER_INFO,
    UPDATE_USER_POST,
    DELETE_USER_POST,
};
