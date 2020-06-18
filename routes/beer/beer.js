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
            if (data.length > 0) {
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
        let reviews = await getReviews(req.params.id); 
        let data = await getBeerInfo(req.params.id);
        if (req.isAuthenticated()) {
            res.render('beer_detail_logged_in', { layout: 'loggedin_User', beer:data, review: reviews });
        } else {
            res.render('beer_detail', { layout: 'main', beer:data, review: reviews });
        }
    });

    router.get('/', async(req, res) => {
        let data = await getAllBeers()
        console.log(data)
        if (req.isAuthenticated()) {
            res.render('menu_page_logged_in', { layout: 'loggedin_User', beer:data });
        } else {
            res.render('menu_page', { layout: 'main', beer:data });
        }
    });
    return router;
};


