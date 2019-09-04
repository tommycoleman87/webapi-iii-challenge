const express = require('express');
const db = require('./postDb.js')
const router = express.Router();

router.get('/', (req, res) => {
    db.get()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    db.getById(id)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: ''})
    })
});

router.delete('/:id', validatePostId, (req, res) => {
    db.remove(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: 'Can not delete Post'})
    })
});

router.put('/:id', validatePostId, (req, res) => {
    const post = req.body
    if(post.text) {
    db.update(req.params.id, post)
    .then(result => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({error: 'Can not update post'})
    })
    } else {
        res.status(400).json({error: 'Please include text in post'})
    }
});

// custom middleware

function validatePostId(req, res, next) {
    db.getById(req.params.id)
    .then(result => {
        if(result){
            next()
        } else {
            res.status(404).json({ message: "invalid user id" })
        }
    })
    .catch(err => {
        res.status(500).json({error: 'Could not validate ID'})
    })
};

module.exports = router;