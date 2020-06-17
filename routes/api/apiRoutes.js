const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const api = require('./callData');

module.exports = (express) => {
    const router = express.Router();

    // TODO, only staff authentication can call it
    router.get('/stock', async(req, res) => {
        let data = await api.getData('stock');
        res.send(data);
    });

    router.get('/beers', async(req, res) => {
        let data = await api.getData('beers');
        res.send(data);
    });

    return router;
};