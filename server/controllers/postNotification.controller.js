const Notify = require("../models/notification.model");
const {
  pushNotification,
  mailNotification,
} = require("../middleware/notification.controller");

const ADD_NOTIFICATION = async (req, res) => {
  console.log("llogg");
  const notification = new Notify({
    createdBy: req.params.id,
    location: req.body.location,
    email: req.body.email,
    type: req.body.type,
  });
  console.log("hitting");
  notification
    .save()
    .then((data) => {
      console.log(data);
      console.log("notification is added");
      res.status(200).send({ msg: "notification is added" });
    })
    .catch((err) => res.status(400).json("error" + err));
};

const FETCH_NOTIFICATION = async (req, res) => {
  Notify.findOne({createdBy: req.params.id}).then((data) => {
    console.log(data);
    res.json(data);
  });
};

const DELETE_NOTIFICATION = async (req, res) => {
  console.log(req.params.id);
  Notify.findByIdAndDelete(req.params.id).then((data) => {
    res.status(201).json({ msg: "Notification Deleted" });
  });
};

module.exports = { ADD_NOTIFICATION , FETCH_NOTIFICATION, DELETE_NOTIFICATION};
