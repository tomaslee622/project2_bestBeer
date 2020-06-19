module.exports = (express) => {
    const router = express.Router();

    router.get('/showlist', (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            res.render('myCart_showList', { layout: 'loggedin_user' });
        }
    });
    // this one above doesnt seem to work

    router.get('/delivery', (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            res.render('myCart_Delivery', { layout: 'loggedin_User' });
        }
    });

    router.get('/payment', (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            res.render('myCart_payment', { layout: 'loggedin_User' });
        }
    });

    router.get('/payment_completed', (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            res.render('myCart_payCompleted', { layout: 'loggedin_User' });
        }
    });

    return router;
};