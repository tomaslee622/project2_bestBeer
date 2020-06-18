const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const api = require('./callData');

module.exports = (express) => {
    const router = express.Router();

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