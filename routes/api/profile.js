//will contain location, bio, experiences, education, social network links
//just going to deal with authentication, username, email, and password.
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load profile model
const Profile = require('../../models/Profile')
//Load user model
const User = require('../../models/User')

//@route  GET api/profile/test
//@desc   Tests profile route
//@acces  Public
router.get('/test', (req, res) => res.json({
    message: 'Profile Route work'
}))

//@route  GET api/profile/
//@desc   Get current user profile
//@acces  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch(err  => res.status(404).json(err))
})

//@route  POST api/profile/
//@desc   Create user profile
//@acces  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    //Get fields 
    const profileFields = {};
    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle;
})

module.exports = router;