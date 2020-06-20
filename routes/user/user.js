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

            let billList = [];

            for (let i = 0; i < data.length; i++) {
                // let purchaseData = await userInfo.getPurchaseHistory(data[i].id);
                // purchase.push(purchaseData[i]);
                billList.push(data[i].id);
            }

            let purchaseList = [];

            for (let i = 0; i < billList.length; i++) {
                let purchaseInBill = await userInfo.getPurchaseHistory(billList[i]);
                purchaseList.push(purchaseInBill);
            }

            let str = '';

            for (let i = 0; i < purchaseList.length; i++) {
                purchaseList[i].forEach((e) => {
                    str += `<tr><td>${e.beer_name}</td><td>${e.quantity}</td><td>${e.price}</td><td>40</td></tr>`;
                });
                data[i].purchase_list = str;
                str = '';
            }

            // res.send(data);
            res.render('user_purchase_history', {
                layout: 'loggedin_User',
                bill: data,
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