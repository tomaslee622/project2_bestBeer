const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

module.exports = (express) => {
    const router = express.Router();
    const getData = async(target) => {

        let stock,

            let query = await knex('stock').select();
        query.then((data) => {
            console.log(data);
            stock = data;
        });
    };

    // TODO, only staff authentication can call it
    router.get('/stock', (req, res) => {
        res.send(stock);
    });

    return router;
};