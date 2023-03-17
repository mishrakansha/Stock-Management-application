const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "Item name is required."],
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  date: {
    type: Date,
    required: true,
  },
  manufacturingCompany: {
    type: String,
    required: [true, "Manufacturing company is required."],
  },
});
module.exports = mongoose.model("items", itemSchema);
