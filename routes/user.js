module.exports = (express) => {
    const router = express.Router();

    router.get('/profile', (req, res) => {
        res.render('user_account-details', { layout: 'loggedin_user' });
    });
    router.get('/comment', (req, res) => {
        res.render('user_comment_history', { layout: 'loggedin_user' });
    });
    router.get('/discount', (req, res) => {
        res.render('user_discount_code', { layout: 'loggedin_user' });
    });

    router.get('/purchase_history', (req, res) => {
        res.render('user_purchase_history', { layout: 'loggedin_user' });
    });

    router.get('/wishlist', (req, res) => {
        res.render('user_wishlist', { layout: 'loggedin_user' });
    });

    return router;
};