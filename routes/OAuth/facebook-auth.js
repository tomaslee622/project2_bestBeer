const router = require('express').Router();
const passport = require('passport');

// Redirect to Faceboook login page
router.get('/', passport.authenticate('facebook'));

router.get(
    '/redirect',
    passport.authenticate('facebook', {
        successRedirect: '/success',
        failureRedirect: '/error',
    })
);

module.exports = router;