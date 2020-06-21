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
            let data = await userInfo.getPurchaseHistory(req.user.id);
            let totalPriceOfPurchase = 0;
            for (let i = 0; i < data.length; i++) {
                data[i].quantity = data[i].quantity * 1;
                data[i].price = data[i].price * 1;
                data[i].total_price = data[i].price * data[i].quantity;
                totalPriceOfPurchase = data[i].total_price + totalPriceOfPurchase;
            }

            console.log(totalPriceOfPurchase);

            res.render('user_purchase_history', {
                layout: 'loggedin_User',
                purchase: data,
                money: { total: totalPriceOfPurchase },
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