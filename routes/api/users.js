//just going to deal with authentication, username, email, and password.
const express = require('express')
const router = express.Router()

//Load user model 
const User = require('../../models/User')

//@route  GET api/user/test
//@desc   Tests user route
//@acces  Private
router.get('/test', (req, res) => res.json({
    message: 'Users Route work'
}))

//@route  GET api/user/register
//@desc   Register user
//@acces  Public
router.post('/register', (req, res) => {

})

module.exports = router;