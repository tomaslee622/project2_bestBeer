const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

module.exports = (express) => {
    const router = express.Router();

    const calTotalPriceForOneBeer = (quantity, price) => {
        console.log(typeof quantity);
        console.log(typeof price);
        let result = quantity * price;
        return result;
    };

    const getUserPurchase = (id) => {
        console.log('getUserPurchase is called');
        let query = knex('purchase')
            .join('beers', 'beers.id', 'purchase.beer_id')
            .select()
            .where({ 'purchase.user_id': 1, 'purchase.bought': false });
        return query.then((data) => data);
    };

    router.get('/showlist', async(req, res) => {
        let data = await getUserPurchase(req.user.id);

        // Calculate the total price for each item in the returned array data
        for (let i = 0; i < data.length; i++) {
            data[i].total_price = calTotalPriceForOneBeer(
                data[i].quantity,
                data[i].price
            );
            // console.log(data);
        }
        res.render('showlist', { layout: 'loggedin_user', purchase: data });
        // if (!req.isAuthenticated()) {
        //     res.redirect('/login');
        // } else {}
    });

    router.get('/delivery', (req, res) => {
        let query = knex('user_address').select();
        query.then((data) => console.log(data));

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
        let query = knex('bills')
            .select()
            .join('purchase', 'purchase.bill_id', 'bills.id');

        query.then((data) => {
            for (let i = 0; i < data.length; i++) {
                data[i].total_price = calTotalPriceForOneBeer(
                    data[i].quantity,
                    data[i].price
                );
            }
            console.log(data);
        });

        res.render('payment_completed', { layout: 'loggedin_user' });
        // if (!req.isAuthenticated()) {
        //     res.redirect('/login');
        // } else {}
    });

    return router;
};