const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

router.post(
  "/",
  [
    body("name", "Enter the valid name").isLength({ min: 3 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter the valid password").isLength({ min: 3 }),
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
);
module.exports = router;
