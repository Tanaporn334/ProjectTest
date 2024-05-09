var express = require('express');
var router = express.Router();
var multer = require('multer')
var bcrypt = require('bcrypt')
const registerSchema = require('../models/register.model')
const { default: mongoose } = require('mongoose');

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
    let register = await registerSchema.findById(id);
    res.status(200).send({
      data: register,
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


/* PUT */
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
    let updateapprove = await registerSchema.findByIdAndUpdate(id, req.body);
    res.status(201).send({
      message: "approve success",
      success: true
    });
  } catch (error) {
    res.status(500).send({
      message: "approve fail",
      success: false
    })
  }
});


module.exports = router;