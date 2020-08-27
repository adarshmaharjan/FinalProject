const express = require('express');
const webpush = require('web-push');
const router = require('express').Router();
// const User = require('../models/User.model');
const nodemailer = require('nodemailer')
require('dotenv').config();
const user = process.env.user;
const password = process.env.password;

const pushNotification = async (push, message) => {
    let subscription = {
        endpoint: push.pushData.endpoint,
        expirationTime: null,
        keys: {
            p256dh: push.pushData.keys.p256dh,
            auth: push.pushData.keys.auth,
        },
    };
    const payload = JSON.stringify({title: message});
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
};

const mailNotification = async (emailId, message, link) => {
    console.log(emailId,message,link);
    let smtpTrasport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: user,
            pass: password,
        },
    });
    let mailOptions = {
        from: `Bot <${user}>`,
        to: `${emailId}`,
        subject: 'Notification',
        text: message,
        html:link
    };
    smtpTrasport.sendMail(mailOptions, function (err) {
        if (err) {
            console.log(err);
            return {message:'error'};
        } else {
            console.log('message sent' +message);
            return {message:'sent'};
        }
    });
};

module.exports = {pushNotification, mailNotification}
