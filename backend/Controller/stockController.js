const Item = require("../models/Items");
const { validationResult } = require("express-validator");
const getAllStock = async (req, res) => {
  try {
    const allProducts = await Item.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    console.log(err);
    res.send(404).send(err.message);
  }
};
const getOneItem = async (req, res) => {
  var id = req.params["id"];
  try {
    const oneProduct = await Item.findOne({ _id: id });
    if (oneProduct == null) {
      res.json("not found");
    } else {
      res.json(oneProduct);
    }
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};
const modifyItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  var id = req.params["id"];
  var matchQuery = await Item.findOne({ _id: id });
  const { itemName, quantity, price, description, date, manufacturingCompany } =
    req.body;
  if (matchQuery == null) {
    res.json("error");
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
      return res.status(400).json(error.message);
    }
  }
};
const deleteItem = async (req, res) => {
  var id = req.params["id"];
  var matchQuery = await Item.findOne({ _id: id });
  if (matchQuery == null) {
    res.json("error");
  } else {
    try {
      const result = await Item.deleteOne({ _id: id });
      res.status(200).send({ message: "Item successfully deleted!" });
    } catch (err) {
      console.log(err);
    }
  }
};
const additem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const { itemName, quantity, price, description, date, manufacturingCompany } =
    req.body;
  const newItem = new Item({
    itemName: itemName,
    quantity: quantity,
    price: price,
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
      console.log("error", err.message);
      res.status(400).json(err.message);
    });
};
module.exports = { getAllStock, deleteItem, additem, getOneItem, modifyItem };
