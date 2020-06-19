const userInfo = require('./getUserInfo');
const { use } = require('passport');

module.exports = (express) => {
    const router = express.Router();

    router.get('/profile', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            // let data = await userInfo.getInfo(req.params.id);
            // res.send(data);
            // res.send('data');
            res.render('user_account-details', {
                layout: 'loggedin_user',
                //     dtasd: data,
            });
        }
    });

    router.get('/comment', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            // let data = await userInfo.getComment(req.params.id);
            // res.send(data);
            res.render('user_comment_history', { layout: 'loggedin_user' });
        }
    });

    router.get('/discount', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            // let data = await userInfo.getDiscount(req.params.id);
            // // res.send(data);
            res.render('user_discount_code', { layout: 'loggedin_user' });
        }
    });

    router.get('/purchase_history', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            // let data = await userInfo.getPurchaseHistory(req.params.id);
            // res.send(data);
            res.render('user_purchase_history', { layout: 'loggedin_user' });
        }
    });

    router.get('/wishlist', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            // let data = await userInfo.getPurchaseHistory(req.params.id);
            // res.send(data);
            res.render('user_wishlist', { layout: 'loggedin_user' });
        }
    });

    return router;
};