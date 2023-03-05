const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/User');
const Post = require('../models/Post');

//UPDATE
router.put('/:id', (req, res) => {
  if(req.body.userId === req.params.id){
  if(req.body.password){
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
  }
  User.findByIdAndUpdate(req.params.id,
  {
    $set: req.body,  
  },{new: true}).then((result) => {
    res.status(200).json(result)
    // Post.updateMany({username: req.body.username}, {})
  }).catch((err) => {
    res.status(500).json(err)
  });
}else{
  res.status(401).json("you can apdate only your acount");
}

})

//DELETE
router.delete('/:id', (req, res) => {
  if(req.body.userId === req.params.id){
    User.findById(req.params.id)
    .then((result) => {
      Post.deleteMany({username: result.username});
      // console.log(first)
      User.findByIdAndDelete(req.params.id)
      .then((result) => {
        res.status(200).json("User has been deleted")
      }).catch((err) => {
        res.status(500).json(err)
      });

    }).catch((err) => {
      res.status(404).json("user not found!")
    });
  }else{
    res.status(401).json("you can delete only your acount!")
  }

})


//FIND ONE
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
  .then((result) => {
    const {password, ...other} = result._doc;
    res.status(200).json(other);
  }).catch((err) => {
    res.status(500).json(err)
  });
})

module.exports = router;