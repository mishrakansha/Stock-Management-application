const Item = require("../models/Items");
const { validationResult } = require("express-validator");
const getAllStock = async (req, res) => {
  const allProducts = await Item.find({})
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      console.log(err);
      res.send(404).send(err.message);
    });
};
const getOneItem = async (req, res) => {
  const oneProduct = await Item.findOne({ _id: req.params["id"] })
    .then((item) => {
      if (item == null) {
        res.json("not found");
      } else {
        res.json(item);
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
};
const modifyItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  var id = req.params["id"];
  var matchQuery = await Item.findOne({ _id: id });
  console.log(matchQuery);
  if (matchQuery == null) {
    res.json("error");
  } else {
    const newvalues = {
      $set: {
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        date: req.body.date,
        manufacturingCompany: req.body.manufacturingCompany,
      },
    };
    console.log(newvalues);
    const result = await Item.updateOne({ _id: id }, newvalues)
      .then((item) => res.json("updated"))
      .catch((err) => {
        res.send(err.message);
      });
  }
};
const deleteItem = async (req, res) => {
  var matchQuery = await Item.findOne({ _id: req.params["id"] });

  if (matchQuery == null) {
    res.json("error");
  } else {
    const result = await Item.deleteOne({ _id: req.params["id"] })
      .then(() => {
        res.status(200).send({ message: "Item successfully deleted!" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const additem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const newItem = new Item({
    itemName: req.body.itemName,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
    date: req.body.date,
    manufacturingCompany: req.body.manufacturingCompany,
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
