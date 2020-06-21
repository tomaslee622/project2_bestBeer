const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const api = require('./callData');

module.exports = (express) => {
    const router = express.Router();

    // Add or remove wishlist
    router.post('/addOrRemoveWishlist', (req, res) => {
        if (!req.body.id) {
            let beerID = req.headers.referer.split('/');
            beerID = beerID[beerID.length - 1];

            req.body.id = beerID;
        }

        let query = knex('favorite')
            .select()
            .where('favorite.beer_id', req.body.id)
            .where('favorite.user_id', req.user.id);

        query.then((data) => {
            if (data.length === 0) {
                let query = knex('favorite').insert({
                    user_id: req.user.id,
                    beer_id: req.body.id,
                });
                query.then(() => {
                    console.log('Wishlist added');
                });
            } else if (data.length === 1) {
                let query = knex('favorite').del().where({
                    user_id: req.user.id,
                    beer_id: req.body.id,
                });
                query.then(() => {
                    console.log('Wishlist removed');
                });
            }
        });
    });

    router.post('/beer', (req, res) => {
        console.log(req.body);
        let query = knex('purchase')
            .select()
            .where({ user_id: req.user.id, beer_id: req.body.id });

        query
            .then((data) => {
                if (data.length > 0) {
                    req.body.value = req.body.value * 1;
                    let newQuantity = data[0].quantity + req.body.value;
                    let updateQuantity = knex('purchase')
                        .update({ quantity: newQuantity })
                        .where({ user_id: req.user.id, beer_id: req.body.id });

                    updateQuantity.then(() => {
                        console.log('A user has updated beers quantity in showlist');
                        res.redirect('/beer');
                    });
                } else {
                    let addNewBeers = knex('purchase').insert({
                        user_id: req.user.id,
                        beer_id: req.body.id,
                        quantity: req.body.value,
                    });

                    addNewBeers.then(() => {
                        console.log('A user has bought new beers');
                        res.redirect('/beer');
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    router.post('/showlist/beer', (req, res) => {
        // console.log(req.body);
        let removeFromCart = knex('purchase')
            .del()
            .where({ user_id: req.user.id, beer_id: req.body.id });

        removeFromCart.then(() => {
            console.log('Beers are removed from the shopping cart');
        });
    });

    // TODO, only staff authentication can call it
    // router.get('/stock', async(req, res) => {
    //     console.log(req);
    //     let data = await api.getData('stock');
    //     res.send(data);
    // });

    // // This route is open to visitors
    // router.get('/beers', async(req, res) => {
    //     let data = await api.getData('beers');
    //     res.send(data);
    // });

    // This route is for purchase route
    // router.get('/purchase', async(req, res) => {
    //     let data = await api.getUserPurchase(req.user.id);
    //     res.send(data);
    // });

    return router;
};