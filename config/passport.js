const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; //to extract the payload
const mongoose = require('mongoose'); //searching for user that comes with the payload
const User = mongoose.model('users'); //model or schema
const keys = require('../config/keys');

//options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        
    }))
}