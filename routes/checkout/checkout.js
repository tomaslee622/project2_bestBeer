const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const checkoutInfo = require('./getCheckoutInfo');

module.exports = (express) => {
    const router = express.Router();

    const calTotalPriceForOneBeer = (quantity, price) => {
        let result = quantity * price;
        return result;
    };

    const getUserPurchase = (id) => {
        let query = knex('purchase')
            .join('beers', 'beers.id', 'purchase.beer_id')
            .select()
            .where({
                'purchase.user_id': id,
                // bought: false
            });
        return query.then((data) => data);
    };

    router.get('/showlist', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            let data = await getUserPurchase(req.user.id);

            let sub_total = 0;
            let delivery = 100;
            let total = 0;

            // Calculate the total price for each item in the returned array data
            for (let i = 0; i < data.length; i++) {
                data[i].total_price = calTotalPriceForOneBeer(
                    data[i].quantity,
                    data[i].price
                );
                sub_total += data[i].total_price;
            }

            if (sub_total > 500) {
                delivery = 0;
                total = sub_total;
            } else {
                total = delivery + sub_total;
            }

            res.render('showlist', {
                layout: 'loggedin_User',
                purchase: data,
                money: { sub: sub_total, delivery: delivery, total: total },
            });
        }
    });

    router.get('/delivery', async(req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            let data = await checkoutInfo.getAddress(req.user.id);
            res.render('delivery', { layout: 'loggedin_User', data: data });
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