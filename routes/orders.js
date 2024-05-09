var express = require('express');
var router = express.Router();
var multer = require('multer')
const ordersSchema = require('../models/orders.model');
const productsSchema = require('../models//product.model');
const { default: mongoose } = require('mongoose');

/* POST */
router.post('/', async function(req, res, next) {
  try {
    const { order_name, amount,id_product } = req.body;
    let newOrder = new ordersSchema({
      order_name: order_name,
      amount: amount,
      id_product: id_product
    });
    let order = await newOrder.save();
    res.status(201).send({
      data: order,
      message: "create success",
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "create fail",
      success: false
    })
  }
});


router.get("/", async function (req, res, next) {
  try {
    let order = await ordersSchema.find();
    res.status(200).send({
      data: order,
      message: "success",
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
      success: false
    })
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"]
      });
    }
    let product = await productsSchema.findById(id);
    res.status(200).send({
      data: product,
      message: "success",
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
      success: false
    })
  }
});

module.exports = router;