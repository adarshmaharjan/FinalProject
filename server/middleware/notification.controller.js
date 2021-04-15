const express = require("express");
const webpush = require("web-push");
const nodemailer = require("nodemailer");
require("dotenv").config();
const user = process.env.user;
const password = process.env.password;

/**
 * pushNotification.
 *
 * @param {} push [takes in the actual push data from server side]
 * @param {} message [types of message to be displayed to the user]
 */
const pushNotification = async (push, message) => {
  let subscription = {
    endpoint: push.pushData.endpoint,
    expirationTime: null,
    keys: {
      p256dh: push.pushData.keys.p256dh,
      auth: push.pushData.keys.auth,
    },
  };
  const payload = JSON.stringify({ title: message });
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
};

/**
 * mailNotification.
 *
 * @param {} emailId [users email id]
 * @param {} message [message to be sent to the user]
 * @param {} link [link to be sent to the user for interation]
 */
const mailNotification = async (emailId, message, link) => {
  console.log(emailId, message, link);
  let smtpTrasport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: user,
      pass: password,
    },
  });
  let mailOptions = {
    from: `Bot <${user}>`,
    to: `${emailId}`,
    subject: "Airbnb 2.0",
    text: message,
    html: link,
  };
  smtpTrasport.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
      return { message: "error" };
    } else {
      console.log("message sent" + message);
      return { message: "sent" };
    }
  });
};

module.exports = { pushNotification, mailNotification };
