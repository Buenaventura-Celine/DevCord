//just going to deal with authentication, username, email, and password.
const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')

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
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({ email: 'Email already exist' })
            } else{
                const newUser = new User({
                    name : req.body.name, 
                    email : req.body.email,
                    avatar, 
                    password: req.body.password
                })
            }
        })
})

module.exports = router;