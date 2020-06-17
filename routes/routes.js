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