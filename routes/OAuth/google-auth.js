const router = require('express').Router();
const passport = require('passport');

// auth with google
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

// callback route for google to redirect to
router.get(
    '/google/redirect',
    passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/error',
    })
);

module.exports = router;