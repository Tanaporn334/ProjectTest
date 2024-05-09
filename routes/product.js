var express = require('express');
var router = express.Router();
var multer = require('multer')
const productsSchema = require('../models//product.model');
const ordersSchema = require('../models/orders.model');
const { default: mongoose } = require('mongoose');

/* POST */
router.post('/', async function(req, res, next) {
  try {
    const { product_name, price, stock } = req.body;
    let newProduct = new productsSchema({
      product_name: product_name,
      price: price,
      stock: stock
    });
    let product = await newProduct.save();
    res.status(201).send({
      data: product,
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
    let product = await productsSchema.find();
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

router.get("/:id/orders", async function (req, res, next) {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"]
      });
    }
    const order = await ordersSchema.find({ id_product: id });
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

router.post("/:id/orders", async function (req, res, next) {
  try {
    const { amount } = req.body;
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) { 
      res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"]
      });
    }
    const orders = await ordersSchema.find({ id_product: id });
    const product = await productsSchema.findById(id);
    if (amount > product.stock) {
      return res.status(404).send({
        msg: "Quantity more than in stock!",
        order: "Fail"
      })
    }
    let newOrder = new ordersSchema({
      order_name: product.product_name,
      amount: amount,
      id_product: id
    });
    let updateStock = product.stock - amount;
    let updateproduct = await productsSchema.findByIdAndUpdate(id, { stock: updateStock });
    let order = await newOrder.save();
    res.status(201).send({
      data: order,
      message: "create success",
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "server error",
      success: false
    })
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"]
      });
    }
    let updateproduct = await productsSchema.findByIdAndUpdate(id, req.body);
    res.status(201).send({
      message: "update success",
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "update fail",
      success: false
    })
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"]
      });
    }
    let deletedproduct = await productsSchema.findByIdAndDelete(id);
    res.status(201).send({
      message: "delete success",
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "delete fail",
      success: false
    })
  }
});

module.exports = router;