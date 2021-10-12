//just going to deal with authentication, username, email, and password.
const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

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
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //Size
                    r: 'pg', //Rating
                    d: 'mm' //Default
                })

                const newUser = new User({
                    name : req.body.name, 
                    email : req.body.email,
                    avatar, 
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

//@route  GET api/user/login
//@desc   Login user/Returning JWT Token
//@acces  Public
router.post('login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email})
        .then(user => {
            //Check for user 
            if(!user){
                return res.status(404).json({email: 'User not found'})
            }

            //Check password
            bcrypt.compare(password, user.password) 
        })
})

module.exports = router;