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
        let query = knex('reviews')
            .select()
            .where('reviews.beer_id', '=', id)
            .join('users', 'users.id', 'reviews.user_id')
            .select('reviews.content', 'reviews.created_at', 'users.first_name');
        return query.then((data) => {
            if (data.length >= 0) {
                let newData = data[0]['created_at'];
                newData = JSON.stringify(newData);
                for (let i = 0; i < data.length; i++) {
                    data[i].date = newData.split('T')[0];
                    data[i].time = newData.split('T')[1];
                    data[i].date = data[i].date.replace('"', '');
                    data[i].time = data[i].time.replace('Z"', '');
                }
            }
            return data;
        });
    };

    router.get('/:id', async(req, res) => {
        // let data = await getBeerInfo(req.params.id);
        let reviews = await getReviews(req.params.id); // res.send(data);
        // res.render('beer1_detail', { beer: data, review: reviews });
        // let data = await getBeerInfo(req.params.id);

        res.send(reviews);

        // res.render('beer1_detail');
    });

    router.get('/', async(req, res) => {
        let data = await getAllBeers();
        // res.send(data);
        res.render('menu_page', { beer: data });
    });

    return router;
};