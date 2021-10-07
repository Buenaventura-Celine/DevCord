//just going to deal with authentication, username, email, and password.
const express = require('express')
const router = express.Router()

//@route  GET api/profile/test
//@desc   Tests user route
//@acces  Private
router.get('/test', (req, res) => res.json({
    message: 'Users Route work'
}))

module.exports = router;