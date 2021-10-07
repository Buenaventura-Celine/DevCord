//will deal with post
//just going to deal with authentication, username, email, and password.
const express = require('express')
const router = express.Router()

//@route  GET api/posts/test
//@desc   Tests post route
//@acces  Public
router.get('/test', (req, res) => res.json({
    message: 'Posts Route work'
}))

module.exports = router;