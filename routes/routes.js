const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = (express) => {
    const router = express.Router();

    // Login checking function
    const checkAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    };

    // Visitor checking function
    const checkNotAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/success');
        }
        return next();
    };

    router.get('/', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('homepage', { layout: 'loggedin_User' });
        } else {
            res.render('homepage', { layout: 'main' });
        }
    });

    router.get('/error', (req, res) => {
        res.send('Opps, error!');
    });

    // Register handler
    router.get('/register', checkNotAuthenticated, (req, res) => {
        res.render('user_registration', { layout: 'main' });
    });

    router.post('/register', async(req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.push({
                email: req.body.username,
                password: hashedPassword,
            });
            res.redirect('/login');
        } catch {
            res.redirect('/error');
        }

        res.redirect('/login');
    });

    router.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/');
    });

    return router;
};