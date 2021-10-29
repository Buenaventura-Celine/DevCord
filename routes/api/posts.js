//will deal with post
//just going to deal with authentication, username, email, and password.
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose') //because where dealing with database
const passport = require('passport') //for our protected route

const validatePostInput = require('../../validation/post')

const Post = require('../../models/Post')

//@route  GET api/posts/test
//@desc   Tests post route
//@acces  Public
router.get('/test', (req, res) => res.json({
    message: 'Posts Route work'
}))

//@route  GET api/posts/ 
//@desc   Get posts
//@acces  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404))
})

//@route  POST api/posts
//@desc   Create post
//@acces  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.body.user,
    })
    newPost.save()
        .then(post => res.json(post))
})

module.exports = router;