const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);
require('dotenv').config();
const stripe = require('stripe')(
    'sk_test_518lozLLgBPNaPJ84X4r0DY8d0vHLn25N8IVpibuYEA3GyYrirLtBwF86ngH3eyFgutW0KV5S3Cx1lt8OYvIGrnRI005px9sZiD'
);

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

    router.get('/payforbeer', async(req, res) => {
//         let totalAmount = 0;
//         // TODO Using knex to access the false purchase data
//         getUserPurchase(req.user.id).then(async(data) => {
//             for (let i = 0; i < data.length; i++) {
//                 console.log(data[i].quantity);
//                 console.log(data[i].price);
//                 data[i].price = data[i].price * 1;
//                 data[i].quantity = data[i].quantity * 1;
//                 let result = calTotalPriceForOneBeer(data[i].quantity, data[i].price);
//                 totalAmount = result + totalAmount;
//             }

//             totalAmount = totalAmount * 1;
//             console.log(totalAmount);
//             try {
//                 const session = await stripe.checkout.sessions.create({
//                     success_url: 'http://www.bestbeer79.com:3000/checkout/payment_completed',
//                     cancel_url: 'http://www.bestbeer79.com:3000/checkout/showlist',
//                     payment_method_types: ['card'],
//                     customer_email: req.user.email,
//                     line_items: [{
//                         name: 'Beers',
//                         description: 'A local craft beer website, by the way, is the picture creepy? Or does it look like a scam.',
//                         currency: 'usd',
//                         amount: totalAmount * 100,
//                         quantity: 1,
//                         images: ['https://i.imgur.com/sUjnVxw.jpg'],
//                     }, ],
//                     mode: 'payment',
//                 });
//                 res.send({
//                     session: session,
//                 });
//             } catch (err) {
                res.send("HIHIHI");
//                 console.log(err);
//             }
//         });
    });

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
            let paymentCompleted = knex('purchase')
                .update({ bought: true })
                .where({ user_id: req.user.id });

            paymentCompleted.then(() => {
                res.render('payment_completed', { layout: 'loggedin_User' });
            });
        }
    });

    return router;
};
