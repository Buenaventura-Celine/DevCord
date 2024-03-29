//just going to deal with authentication, username, email, and password.
const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

//Load user model 
const User = require('../../models/User')

//Load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

//@route  GET api/user/test
//@desc   Tests user route
//@acces  Private
router.get('/test', (req, res) => res.json({
    message: 'Users Route work'
}))

//@route  POST api/user/register
//@desc   Register user
//@acces  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exist' })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //Size
                    r: 'pg', //Rating
                    d: 'mm' //Default
                })

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

//@route  POST api/user/login
//@desc   Login user/Returning JWT Token
//@acces  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email })
        .then(user => {
            //Check for user 
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors)
            }

            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //User Matched
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar

                        }
                        //generate token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            })
                    } else {
                        errors.password = 'Incorrect password'
                        return res.status(400).json(errors)
                    }
                })
        })
})

//@route  GET api/user/current
//@desc   Return current user
//@acces  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    })
})

module.exports = router;