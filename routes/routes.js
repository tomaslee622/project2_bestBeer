const passport = require('passport');
const bcrypt = require('bcrypt');
const knexConfig = require('../knexfile')['development'];
const knex = require('knex')(knexConfig);

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

    
    const getAllBeers = () => {
        let query = knex('beers').select();
        return query.then((data) => data);
    };

    router.get('/', async(req, res) => {
        let data = await getAllBeers()
        if (req.isAuthenticated()) {
            res.render('homepage_logged_in', { layout: 'loggedin_User', beer:data });
        } else {
            res.render('homepage', { layout: 'main', beer:data });
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
        // try {
        // console.log(req.body);
        let check = knex('users').select().where('email', '=', req.body.email);
        check.then((data) => {
            if (data.length >= 1) {
                console.log('Email exists.');
                res.send('Email exists');
            }
        });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        console.log(req.body.firstName);
        console.log(hashedPassword);

        let query = await knex('users').insert({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });

        query.then((data) => {
            console.log('User registered');
            console.log(data);
            res.redirect('/login');
        });
        // res.redirect('/login');
        // } catch {
        //     res.redirect('/error');
        // }
    });

    router.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/');
    });

    router.post(
        '/login',
        passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login',
        })
    );

    return router;
};