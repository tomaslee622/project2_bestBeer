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
        res.render('homepage');
    });

    router.get('/success', checkAuthenticated, (req, res) => {
        res.send('Hello, ' + req.user.email + ' you successfully logged in');
    });

    router.post(
        '/login',
        passport.authenticate('local-login', {
            successRedirect: '/success',
            failureRedirect: '/error',
        })
    );

    router.get('/error', (req, res) => {
        res.send('Opps, error!');
    });

    // Register handler
    router.get('/register', checkNotAuthenticated, (req, res) => {
        res.send('Register Page');
    });

    router.post('/register', async(req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.push({
                email: req.body.username,
                password: hashedPassword,
            });
            res.redirect('/');
        } catch {
            res.redirect('/error');
        }
    });

    router.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/');
    });

    return router;
};