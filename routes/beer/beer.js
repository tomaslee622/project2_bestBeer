const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

module.exports = (express) => {
    const router = express.Router();

    const getBeerInfo = (id) => {
        let query = knex('beers').select().where({ id: id });
        return query.then((data) => data);
    };

    router.get('/:id', async(req, res) => {
        let data = await getBeerInfo(req.params.id);
        res.send(data);
        // res.render('beer1_detail');
    });

    return router;
};