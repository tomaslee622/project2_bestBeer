const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const api = require('./callData');

module.exports = (express) => {
    const router = express.Router();

    // Add or remove wishlist
    router.post('/addOrRemoveWishlist', (req, res) => {
        console.log(req.body);
        console.log(req.user);

        let query = knex('favorite')
            .select()
            .where('favorite.beer_id', req.body.id)
            .where('favorite.user_id', req.user.id);

        query.then((data) => {
            console.log(data);
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
        console.log('HI');
        console.log(req.body);
        console.log(req.user);
        // res.send('Bye');

        let query = knex('purchase')
            .select()
            .where({ user_id: req.user.id, beer_id: req.body.id });

        query.then((data) => {
            console.log(data);
        });

        // if (existData.length === 0) {
        //     let buyNewBeers = knex('purchase').insert({
        //         beer_id: req.body.id,
        //         user_id: req.user.id,
        //         quantity: req.body.value,
        //     });

        //     buyNewBeers.then((data) => {
        //         console.log('You are getting new beers');
        //         console.log(data);
        //     });
        // } else if (existData.length === 1) {
        //     req.body.value;
        //     let updateBeer = knex('purchase').update({});
        // }

        // let data = await buyBeer(req.user.id, req.body.id, req.body.value);
        // console.log(data);
        // let query = await knex('purchase')
        //     .select()
        //     .where({ user_id: req.user.id, beer_id: req.body.id });
        // query.then((data) => data);
        // return query.then((data) => {
        //     console.log(data);
        // });

        // let query = await knex('purchase').select().where({ beer_id: req.body.id });
        // query.then((data) => {
        // if(data.length === 0){
        //     let addNewBeers = knex.insert()
        // }
        //     console.log(data);
        // });
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