const user = require('./user/user');
const passport = require('passport');

module.exports = (express) => {
    const router = express.Router();

    // The login page that allows user either login or register
    router.get('/', (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('login_begin', { layout: 'main' });
        }
    });

    // Users can opt for social login or local login
    router.get('/input', (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('login_input', { layout: 'main' });
        }
    });

    router.get('/user_registration', (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.render('user_registration', { layout: 'main' });
        }
    });

    return router;
};