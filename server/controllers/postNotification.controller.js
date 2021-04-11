const Notify = require("../models/notification.model");
const {
  pushNotification,
  mailNotification,
} = require("../middleware/notification.controller");

const ADD_NOTIFICATION = async (req, res) => {
  const notification = new Notify({
    createdBy: req.params.id,
    location: req.body.location,
    email: req.body.email,
    type:req.body.type,
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

module.exports = { ADD_NOTIFICATION };
