var express = require('express');
var router = express.Router();
var multer = require('multer')
var bcrypt = require('bcrypt')
const userSchema = require('../models/login.model')

// ---------- config Uploaad file -------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '_' + file.originalname)
  }
})

const upload = multer({ storage: storage })

// ---------- Start API Usres -------------
/* GET users listing. */
router.get('/:id', async function (req, res, next) {
  try {
    let params = req.params
    let querys = req.query

    //let hash = await bcrypt.hash('1234', 10)


    //let users = await userSchema.find({})


    let token = await jwt.sign()
    let verify = await jwt.verify(token, '11111')

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

/* POST */
router.post('/', upload.single('profile'), async function(req, res, next) {
  try {
    let { name, age } = req.body

    let user = new userSchema({
      name,
      age,
      file: req.file.filename
    })


    let save = await user.save()

    res.status(200).send(save);
  } catch (error) {
    res.status(500).send(error.toString())
  }
});


/* PUT */
router.put('/', async function (req, res, next) {
  try {
    let { name, age } = req.body

    let update = await userSchema.findByIdAndUpdate(req.params.dictionary, { name, age },{new: true})
    
    res.status(200).send(update);
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

/* DELETE */
router.delete('/', async function(req, res, next) {
  try {
    
    let delete_user = await userSchema.findByIdAndDelete(req.params.id)
      
    res.status(200).send(update);
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

module.exports = router;