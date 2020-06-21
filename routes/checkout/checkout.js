const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);
const stripe = require('stripe')(
    'sk_test_518lozLLgBPNaPJ84X4r0DY8d0vHLn25N8IVpibuYEA3GyYrirLtBwF86ngH3eyFgutW0KV5S3Cx1lt8OYvIGrnRI005px9sZiD'
);

require('dotenv').config();

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
                bought: false,
            });
        return query.then((data) => data);
    };

    router.post('/test', async(req, res) => {
        // TODO Using knex to access the false purchase data
        getUserPurchase(req.user.id).then((data) => {
            for (let i = 0; i < data.length; i++) {
                data[i].quantity;
            }
        });

        try {
            const session = await stripe.checkout.sessions.create({
                success_url: 'http://localhost:3000/checkout/payment_completed',
                cancel_url: 'http://localhost:3000/checkout/showlist',
                payment_method_types: ['card'],
                line_items: [{
                    name: 'Beers',
                    description: 'A local craft beer website',
                    currency: 'usd',
                    amount: 100,
                    quantity: 70,
                }, ],
                mode: 'payment',
            });
            res.send({
                session: session,
            });
        } catch (err) {
            console.log(err);
        }
    });

    // router.get('/', (req, res) => {
    //     stripe.checkout.sessions.retrieve(
    //         'cs_test_hasYnf7uN1p3iJ0Mm0gwYDzoLLBvzwJROvvOSNzY1jtSyoNmhmeOSvlb',
    //         function(err, session) {
    //             // asynchronously called
    //         }
    //     );
    // });

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

    router.post('/payment_intents', (req, res) => {
        console.log('HI');
        console.log(req.body);
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: 1099,
        //     currency: 'usd',
        // });
        stripe.charges
            .create({
                amount: 1000,
                source: req.body.stripeTokenId,
                currency: 'usd',
            })
            .then(function() {
                console.log('Charge Successful');
                res.json({ message: 'Successfully purchased items' });
            })
            .catch(function() {
                console.log('Charge Fail');
                res.status(500).end();
            });
    });

    router.get('/payment_completed', (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        } else {
            res.render('payment_completed', { layout: 'loggedin_User' });
        }
    });

    router.post('/');

    return router;
};