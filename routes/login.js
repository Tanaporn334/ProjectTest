var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const registerSchema = require('../models/register.model');
const { default: mongoose } = require('mongoose');

/* POST */
router.post('/', async function(req, res, next) {
  try {
    let { password,username} = req.body;
    let user = await registerSchema.findOne({
      username: username
    });
    if (!user) {
      res.status(500).send({
        message: "login fail no username!!",
        success: false
      });
    }
    let checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(500).send({
        message: "login fail the password is incorrect!!",
        success: false
      });
    }
    let checkapprove = await registerSchema.find({ username: username });
    if (checkapprove.approve == false) {
      res.status(500).send({
        message: "login fail รอ!!",
        success: false
      });
    }
    // const register = await registerSchema.find({ approve: test });
    // const test = await registerSchema.findById(id);
    // let ap = await registerSchema.findOne({
    //   approve: approve
    // });
    console.log(checkapprove.approve);
    // let checkapprove = await registerSchema.find({ss:approve});
    // console.log(register);
    // if (approve == false) {
    //   res.status(500).send({
    //     message: "login fail รอ!!",
    //     success: false 
    //   });
    // }
    //let checkapprove = await registerSchema.find();
    //var { id } = user;
    res.status(201).send({
      data: {},
      message: "login success", 
      success: true
    });  
  } catch (error) {
    res.status(500).send({
      message: "login fail",
      success: false 
    })
  }
});

module.exports = router;