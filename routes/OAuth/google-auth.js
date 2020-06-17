const router = require('express').Router();
const passport = require('passport');

// auth with google
router.get(
    '/',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

// callback route for google to redirect to
router.get(
    '/redirect',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/error',
    })
);

module.exports = router;