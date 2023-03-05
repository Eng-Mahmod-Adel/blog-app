const router = require('express').Router();
const Category = require('../models/Category');
const { find } = require('../models/User');

router.post('/', (req, res) => {
  const category = new Category(req.body);
  category.save()
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})


router.get('/', (req, res) => {
  const category = Category.find();
  category
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})
module.exports = router;