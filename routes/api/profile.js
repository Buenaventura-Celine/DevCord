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
//@desc   Create or Edit user profile
//@acces  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    //Get fields 
    const profileFields = {};
    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //Skills - Split into an array
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',')
    }

    //Social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;




})

module.exports = router;