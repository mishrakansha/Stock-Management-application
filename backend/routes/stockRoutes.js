const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const stockController = require("../Controller/stockController");
router.get("/allItem", stockController.getAllStock);
router.get("/getOneItem/:id", stockController.getOneItem);
router.delete("/deleteItem/:id", stockController.deleteItem);
router.put(
  "/modifyItem/:id",
  [
    body("itemName", "Enter the valid name")
      .isLength({ min: 3 })
      .escape()
      .trim(),
    body("quantity", "Enter the valid quantity")
      .isInt({ min: 0 })
      .escape()
      .trim(),
    body("price", "Enter the valid price").isInt({ min: 1 }).escape().trim(),
    body("date", "Date is invalid").custom((value) => {
      let enteredDate = new Date(value);
      let todaysDate = new Date();
      if (enteredDate < todaysDate) {
        return true;
      }
      throw new Error("Date is required and cannot be invalid");
    }),
  ],
  stockController.modifyItem
);
router.post(
  "/addItem",
  [
    body("itemName", "Enter the valid name")
      .isLength({ min: 3 })
      .escape()
      .trim(),
    body("quantity", "Enter the valid quantity")
      .isInt({ min: 0 })
      .escape()
      .trim(),
    body("price", "Enter the valid price").isInt({ min: 1 }).escape().trim(),
    body("date", "Date is invalid").custom((value) => {
      let enteredDate = new Date(value);
      let todaysDate = new Date();
      if (enteredDate > todaysDate) {
        throw new Error("Invalid Date");
      }
      return true;
    }),
  ],
  stockController.additem
);

module.exports = router;
