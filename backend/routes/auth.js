const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/User');


//REGISTER
router.post('/register', (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
})
  user.save().then((result) => {
    res.status(200).json(result);
    // console.log(result)
  }).catch((err) => {
    res.status(500).json(err);
  })

})

//LOGIN
router.post('/login', (req, res) => {
  const user = User.findOne({username: req.body.username})

  user.then(async(result) => {
    if(!result) {
      return res.status(400).json("Wrong user");
    }
    
    const validated = await bcrypt.compare(req.body.password, result.password);
    if(validated == false){
      res.status(400).json("Wrong password");
    }else{
      const {password, ...other} = result._doc;
      res.status(200).json(other);
    }
  }).catch((err) => {
    res.status(500).json(err);
  })

})

module.exports = router;