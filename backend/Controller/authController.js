const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signIn = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          // console.log(passwordCheck);
          if (!passwordCheck) {
            return res.status(400).send({
              error: "Passwords does not match",
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            {
              expiresIn: "24h",
              // algorithm: "HS256",
            }
          );
          // console.log(token);
          res.status(200).send({
            message: "Login Successful",
            email: user.email,
            token: token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
          });
        });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
      });
    });
};

const signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
};

module.exports = { signUp, signIn };
