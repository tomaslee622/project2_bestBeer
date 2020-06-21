const passport = require('passport');
const bcrypt = require('bcrypt');
const beer = require('./beer/beer');
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
        let data = await getAllBeers();
        if (req.isAuthenticated()) {
            if (req.user.id == 2) {
                res.render('stats', { layout: 'employee' });
            } else {
                res.render('homepage_logged_in', {
                    layout: 'loggedin_User',
                    beer: data,
                });
            }
        } else {
            res.render('homepage', { layout: 'main', beer: data });
        }
    });

    router.get('/error', (req, res) => {
        res.send('Opps, error!');
    });

    // Register handler
    router.get('/register', checkNotAuthenticated, (req, res) => {
        res.render('user_registration', { layout: 'main' });
    });

    router.post('/review', (req, res) => {
        let beerID = req.headers.referer.split('/');
        beerID = beerID[beerID.length - 1];

        console.log(beerID);
        console.log(req.user);
        console.log(req.body.review);

        let query = knex('reviews').insert({
            beer_id: beerID,
            user_id: req.user.id,
            content: req.body.review,
        });

        query.then(() => {
            res.redirect('/beer/' + beerID);
        });
    });

    const registerNewAccount = (req, res) => {
        let check = knex('users').select().where('email', '=', req.body.email);

        check
            .then(async(data) => {
                if (data.length >= 1) {
                    console.log('Email exists.');
                    res.send('Email exists');
                } else {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);

                    let query = knex('users').insert({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        email: req.body.email,
                        password: hashedPassword,
                    });
                    query.then(() => {
                        res.redirect('/login');
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    router.post('/register', (req, res) => {
        registerNewAccount(req, res);
    });

    router.get('/logout', (req, res) => {
        req.logOut();
        res.redirect('/');
    });

    // Below is the api call from other scripts

    router.get('/test', (req, res) => {
        res.render('test');
    });

    router.post('/updateAccountDetails', (req, res) => {
        console.log(req.body);
        let update = knex('users')
            .update({
                address: req.body.address,
                phone: req.body.telephone,
            })
            .where('id', req.user.id);

        update.then(() => {
            console.log('User info updated');
            res.redirect('/user/profile');
        });
    });

    // Inside wishlist page
    router.post('/removeWishlist', (req, res) => {
        let remove = knex('favorite')
            .del()
            .where({ user_id: req.user.id, beer_id: req.body.id });
        remove.then(() => {
            console.log('Wishlist removed');
        });
        res.redirect('/user/profile');
    });

    // Buying beers
    router.post('/beer/shoppingcart', (req, res) => {
        console.log(req.body);
    });

    return router;
};