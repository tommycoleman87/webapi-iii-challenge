const express = require('express');
const db = require('./userDb.js');
const Posts = require('../posts/postDb.js');
const router = express.Router();
router.use(express.json());
router.post('/', validateUser, (req, res) => {
    const user = req.body;
   db.insert(user)
   .then(result => {
       res.status(201).json(result)
   })
   .catch(err => {
       res.status(500).json({error: 'Could not create user'})
   })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
    const post = req.body;
    Posts.insert(post)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({message: 'Could not get user posts', error: err})
    })
});

router.get('/', (req, res) => {
    db.get()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({message: 'Could not get users', error: err})
    })
});

router.get('/:id', validateUserId, (req, res) => {
    db.getById(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({message: "Could not retrieve user", error: err})
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    db.getUserPosts(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({message: 'Could not retrieve posts', error: err})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    db.remove(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({message: 'Could not delete user', error: err})
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    const user = req.body;
    db.update(req.params.id, user)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({message: 'Could not update user', error: err})
    })
});

//custom middleware

function validateUserId(req, res, next) {
    db.getById(req.params.id)
    .then(result => {
        if(result) {
            req.user = result;
            next();
        } else {
            res.status(404).json({ message: "invalid user id" })
        }
    })
};

function validateUser(req, res, next) {
    const user = req.body;
    if(Object.entries(user).length < 1) {
        res.status(400).json({message: 'Missing user data'})
    } else if(!user.name){
        res.status(400).json({message: 'Missing required name field'})
    } else {
        next();
    }
};

function validatePost(req, res, next) {
    const post = req.body
    post.user_id = req.params.id
    if(!post.text) {
        res.status(400).json({ message:"missing required text field"  })
    } else {
        next();
    }
};

module.exports = router;
