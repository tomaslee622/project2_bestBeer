const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

module.exports = (express) => {
    const router = express.Router();

    const getBeerInfo = (id) => {
        let query = knex('beers').select().where({ id: id });
        return query.then((data) => data);
    };

    const getAllBeers = () => {
        let query = knex('beers').select();
        return query.then((data) => data);
    };

    const getReviews = (id) => {
        let query = knex('reviews').select().where({ beer_id: id });
        return query.then((data) => data);
    };

    router.get('/:id', async(req, res) => {
        // let data = await getBeerInfo(req.params.id);
        let review = await getReviews(req.params.id);
        res.send(review);

        // res.render('beer1_detail');
    });

    router.get('/', async(req, res) => {
        let data = await getAllBeers();
        // res.send(data);
        res.render('test', { beer: data });
    });

    return router;
};