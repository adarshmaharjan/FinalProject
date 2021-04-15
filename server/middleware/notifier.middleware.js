const Notify = require("../models/notification.model");
const {
  pushNotification,
  mailNotification,
} = require("../middleware/notification.controller");

const Notifier = (location, type, id, host) => {
  var filtered;
  let link =
    `<h3> Found a ${type} near ${location}</h3><br> <div>Click here to <a href="` +
    `http://localhost:3000/routed/detail/${id}` +
    `">view</a></div>`;
  Notify.find({ location: location }).then((data) => {
    if (type === "Room") {
      filtered = data.filter((dat) => {
        return dat.type === "Room";
      });
    } else {
      filtered = data.filter((dat) => {
        return dat.type === "House";
      });
    }
    console.log("Notifier is invoked");
    filtered.map((dataum) => {
      let link =
        `<h3> Found a ${type} near ${location}</h3><br> <div>Click here to <a href="` +
          `http://localhost:3000/routed/detail/${id}/${type}` +
        `">view</a></div>`;
      console.log(link);
      mailNotification(dataum.email, "Hello", link);
      console.log("mail sent");
    });
  });
};

module.exports = Notifier;
