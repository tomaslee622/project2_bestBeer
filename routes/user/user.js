const userInfo = require('./getUserInfo');
const { use } = require('passport');

module.exports = (express) => {
    const router = express.Router();

    router.get('/profile', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            let data = await userInfo.getInfo(req.user.id);

            res.render('user_account-details', {
                layout: 'loggedin_User',
                userInfo: data,
            });
        }
    });

    router.get('/comment', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            let data = await userInfo.getComment(req.user.id);

            res.render('user_comment_history', {
                layout: 'loggedin_User',
                data: data,
            });
        }
    });

    router.get('/discount', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            let data = await userInfo.getDiscount(req.user.id);
            // res.send(data);
            res.render('user_discount_code', { layout: 'loggedin_User', code: data });
        }
    });

    router.get('/purchase_history', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            let data = await userInfo.getBill(req.user.id);

            let purchase;

            for (let i = 0; i < data.length; i++) {
                let purchaseData = await userInfo.getPurchaseHistory(data[i].id);
                purchase.push(purchaseData[0]);
            }

            // res.send(purchase);
            res.render('user_purchase_history', {
                layout: 'loggedin_User',
                bill: data,
                purchase: { beer_name: 'Asahi' },
            });
        }
    });

    router.get('/wishlist', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            let data = await userInfo.getWishList(req.user.id);

            // res.send(data);
            res.render('user_wishlist', { layout: 'loggedin_User', wishlist: data });
        }
    });

    return router;
};