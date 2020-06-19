module.exports = (express) => {
    const router = express.Router();

    router.get('/showlist', (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            res.render('showlist', { layout: 'loggedin_User' });
        }
    });
    // this one above doesnt seem to work

    router.get('/delivery', (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            res.render('delivery', { layout: 'loggedin_User' });
        }
    });

    router.get('/payment', (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            res.render('payment', { layout: 'loggedin_User' });
        }
    });

    router.get('/payment_completed', (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            res.render('payment_completed', { layout: 'loggedin_User' });
        }
    });

    return router;
};