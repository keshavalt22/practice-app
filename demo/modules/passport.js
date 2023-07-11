var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
}));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(function (userId, done) {
//     User.findById(userId, 'name email username', function (err, user) {
//         done(err, user);
//     });
// });
