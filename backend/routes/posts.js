const router = require('express').Router();
const Post = require('../models/Post');

//CREATE POST
router.post('/', (req, res) => {
  const post = new Post(req.body)
  post.save()
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})

//UPDATE POST
router.put('/:id', (req, res) => {
  const post = Post.findById(req.params.id)
    post.then((result) => {
  if(result.username === req.body.username){
      Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },{new: true})
        .then((result) => {
          res.status(200).json(result)
        }).catch((err) => {
          res.status(500).json(err)
        });
    }else{
      res.status(401).json('you can update only your post!')
    }

    }).catch((err) => {
      res.status(500).json(err)
    })
  
})

//DELETE POST 
router.delete('/:id', (req, res) => {
  const post = Post.findById(req.params.id)
    post.then((result) => {
  if(result.username === req.body.username){
    result.delete()
        .then((result) => {
          res.status(200).json("your post has been deleted")
        }).catch((err) => {
          res.status(500).json(err)
        });
    }else{
      res.status(401).json('you can delete only your post!')
    }

    }).catch((err) => {
      res.status(500).json(err)
    })
  
})

//GET ONE POST
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  });
})

//GET ALL POSTS
router.get('/', (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  let posts;
  if(username){
    posts = Post.find({username})
  }else if(catName){
    posts = Post.find({
      categories: {
        $in: [catName],
      },
    })
  }else{
    posts = Post.find()
  }
  posts.then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err)
  })

})

module.exports = router;