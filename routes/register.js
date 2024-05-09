var express = require('express');
var router = express.Router();
var multer = require('multer')
var bcrypt = require('bcrypt')
const registerSchema = require('../models/register.model')
const { default: mongoose } = require('mongoose');

/* POST */
router.post('/', async function(req, res, next) {
  try {
    let { username, password} = req.body
    let hashPassword = await bcrypt.hash(password, 10);
    let user = new registerSchema({
      username,
      password: hashPassword,
      approve: false
    });
    let save = await user.save()

    res.status(200).send({
      id: save.id,
      username,
      password,
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

module.exports = router;