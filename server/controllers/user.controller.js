const validateRegisterInput = require("../validation/register.validate.js");
const validateLoginInput = require("../validation/login.validate.js");
const key = require("../config/key.js");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const User = require("../models/user.model.js");
const Token = require("../models/token.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    pushNotification,
    mailNotification,
} = require("../middleware/notification.controller");

//register new user
const registerUser = (req, res, next) => {
    console.log("api is working");
    const { errors, isValid } = validateRegisterInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ email: "email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            //hash password before saving in databse
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => {
                            const token = uuidv4();
                            const newToken = new Token({
                                _userId: user._id,
                                token: token,
                            });
                            newToken.save(function (err) {
                                if (err) {
                                    return res
                                        .status(500)
                                        .send({ msg: err.message });
                                }

                                let link =
                                    "Hello,<br> Please Click on the link to verify you email.<br><a href=" +
                                    `http://${req.get(
                                        "host"
                                    )}/api/user/verify?id=${token}` +
                                    ">Click here to verify</a>";

                                mailNotification(
                                    `${req.body.email}`,
                                    `${req.body.name}`,
                                    link
                                ).then((response) => {
                                    res.json(response);
                                    res.end(response);
                                });
                            });
                        })
                        .catch((err) => console.log(err));
                });
            });
        }
    });
};

const verifyUser = (req, res) => {
    console.log(req.query.id, req.protocol, req.get("host"));
    Token.findOne({ token: req.query.id }).then((token) => {
        if (!token) {
            return res.status(400).json({ token: "token doest exist" });
        }
        console.log(token._id, token._userId);
        User.findOneAndUpdate(
            { _id: token._userId },
            { isVerified: true }
        ).then(res.json({ message: "you have been verified" }));
    });
};

const loginUser = (req, res) => {
    //form validation
    const { errors, isValid } = validateLoginInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then((user) => {
        //check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                message: "User is not verified please verify you account",
            });
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    profile: user.profile,
                };

                jwt.sign(
                    payload,
                    key.secretKey,
                    {
                        expiresIn: 3600,
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token,
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Passsword incorrect" });
            }
            console.log("logged");
        });
    });
};

module.exports = { registerUser, loginUser, verifyUser };
