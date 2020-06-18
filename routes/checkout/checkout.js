module.exports = (express) => {
    const router = express.Router();

    router.get('/showlist', (req, res) => {
        res.render('/checkout/showlist', { layout: 'loggedin_user' });
        // if (!req.isAuthenticated()) {
        //     res.redirect('/login');
        // } else {}
    });

    router.get('/delivery', (req, res) => {
        res.render('myCart_Delivery', { layout: 'loggedin_user' });
        // if (!req.isAuthenticated()) {
        //     res.redirect('/login');
        // } else {}
    });
    router.get('/payment', (req, res) => {
        res.render('myCart_payment', { layout: 'loggedin_user' });
        // if (!req.isAuthenticated()) {
        //     res.redirect('/login');
        // } else {}
    });
    router.get('/payment_completed', (req, res) => {
        res.render('myCart_payCompleted', { layout: 'loggedin_user' });
        // if (!req.isAuthenticated()) {
        //     res.redirect('/login');
        // } else {}
    });

    return router;
};