//will deal with post
//just going to deal with authentication, username, email, and password.
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose') //because where dealing with database
const passport = require('passport') //for our protected route

const validatePostInput = require('../../validation/post')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

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
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
})

//@route  GET api/posts/:id
//@desc   Get posts
//@acces  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID' }))
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

//@route  DELETE api/posts/:id
//@desc   Delete post
//@acces  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User not authorized' })
                    }
                    post.remove()
                        .then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
        })
})

//@route  Post api/posts/like/:id
//@desc   Like post
//@acces  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyliked: 'User already liked this post' })
                    }

                    //Add user id to likes array
                    post.likes.unshift({ user: req.user.id })
                    post.save()
                        .then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
        })
})

//@route  Post api/posts/unlike/:id
//@desc   Unlike post
//@acces  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length == 0) {
                        return res.status(400).json({ notliked: 'You have not yet liked this post' })
                    }

                    //Get remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id)

                    //Splice out of array 
                    post.likes.splice(removeIndex, 1)

                    //save 
                    post.save()
                        .then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
        })
})

//@route  Post api/posts/comment/:id
//@desc   Add comment to a post 
//@acces  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.body.user,
            }

            //Add to comments array
            post.comments.unshift(newComment);

            //Save 
            post.save.then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
})

module.exports = router;