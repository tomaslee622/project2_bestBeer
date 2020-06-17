const FacebookStrategy = require('passport-facebook');
const passport = require('passport');
const loginOrCreate = require('./loginOrCreate');

require('dotenv').config();

passport.use(
    new FacebookStrategy({
            clientID: process.env.FB_APP_ID,
            clientSecret: process.env.FB_APP_SECRET,
            callbackURL: `http://localhost:3000/auth/facebook/redirect`,
            profileFields: ['email', 'name'],
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile);
            loginOrCreate(profile, done, {
                provider: 'facebook',
                facebook_id: profile.id,
            });
        }
    )
);