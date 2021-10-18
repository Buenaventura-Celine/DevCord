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



module.exports = router;