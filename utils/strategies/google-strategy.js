const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const loginOrCreate = require("./loginOrCreate");

require("dotenv").config();

passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/redirect",
        },
        function(accessToken, refreshToken, profile, done) {
            loginOrCreate(profile.emails[0].value, done, {
                provider: "google",
                google_id: profile.id,
            });
        }
    )
);