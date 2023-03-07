const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  Item_name: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
    unique: true,
  },
  price: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("items", itemSchema);
