const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../Controller/authController");
router.post(
  "/signIn",
  [body("email", "Enter the valid email").isEmail().normalizeEmail()],
  authController.signIn
);
router.post(
  "/signUp",
  [
    body("name", "Enter the valid name").isLength({ min: 3 }).trim().escape(),
    body("email", "Enter the valid email").isEmail().normalizeEmail(),
    body(
      "password",
      "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/, "i"),
  ],
  authController.signUp
);
module.exports = router;
