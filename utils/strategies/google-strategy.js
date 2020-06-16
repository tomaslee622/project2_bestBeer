const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const loginOrCreate = require('./loginOrCreate');

require('dotenv').config();

passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/redirect',
        },
        function(accessToken, refreshToken, profile, done) {
            // console.log('Given name: ' + profile.name.givenName);
            // console.log('Last name: ' + profile.name.familyName);
            // console.log('Nice looking pic: ' + profile.photos[0].value);
            console.log(profile);
            loginOrCreate(profile, done, {
                provider: 'google',
                google_id: profile.id,
            });
        }
    )
);