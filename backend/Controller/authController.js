const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signIn = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((passwordCheck) => {
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
            "secret",
            {
              expiresIn: "24h",
            }
          );
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
      res.status(400).send({
        message: "Email not found",
      });
    });
};

const signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  const { name, email, password, username } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      const user = new User({
        name: name,
        username: username,
        email: email,
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
          res.status(500).send({
            message: error.message,
          });
        });
    })
    .catch((e) => {
      res.status(500).send({
        message: "Error !",
      });
    });
};

module.exports = { signUp, signIn };
