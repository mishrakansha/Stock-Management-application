const Item = require("../models/Items");
const { validationResult } = require("express-validator");

const getAllStock = async (req, res) => {
  try {
    const { user } = req;
    const allProducts = await Item.find({ User: user }).populate("User");
    res.status(200).json(allProducts);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
};
const getOneItem = async (req, res) => {
  const id = req.params["id"];
  try {
    const oneProduct = await Item.findOne({ _id: id });
    if (oneProduct == null) {
      return res.status(400).json({
        success: false,
        message: "Bad request",
      });
    } else {
      res.json(oneProduct);
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
};
const modifyItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
  const id = req.params["id"];
  const matchQuery = await Item.findOne({ _id: id });
  const { itemName, quantity, price, description, date, manufacturingCompany } =
    req.body;
  if (matchQuery == null) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  } else {
    const newvalues = {
      $set: {
        itemName: itemName,
        quantity: quantity,
        price: price,
        description: description,
        date: date,
        manufacturingCompany: manufacturingCompany,
      },
    };
    try {
      await Item.updateOne({ _id: id }, newvalues);
      res
        .status(200)
        .json(await Item.findOne({ _id: await Item.findOne({ _id: id }) }));
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Bad request",
      });
    }
  }
};
const deleteItem = async (req, res) => {
  const id = req.params["id"];
  const matchQuery = await Item.findOne({ _id: id });
  if (matchQuery == null) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  } else {
    try {
      const result = await Item.deleteOne({ _id: id });
      res.status(200).send({ message: "Item successfully deleted!" });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Bad request",
      });
    }
  }
};
const additem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
  const { itemName, quantity, price, description, date, manufacturingCompany } =
    req.body;
  const { user } = req;
  const newItem = new Item({
    itemName: itemName,
    quantity: quantity,
    price: price,
    User: user,
    description: description,
    date: date,
    manufacturingCompany: manufacturingCompany,
  });
  newItem
    .save()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Bad request",
      });
    });
};
module.exports = { getAllStock, deleteItem, additem, getOneItem, modifyItem };
