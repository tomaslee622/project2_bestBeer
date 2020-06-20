const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const getInfo = (id) => {
    let query = knex('users')
        .select()
        .innerJoin('user_address', 'users.id', 'user_address.user_id')
        .where('users.id', id);
    return query.then((data) => data);
};

const getUserAddress = (id) => {
    let query = knex('user_address').select().where({ user_id: id });
    return query.then((data) => data);
};

const getComment = (id) => {
    let query = knex('reviews')
        .select()
        .innerJoin('beers', 'beers.id', 'reviews.beer_id')
        .where('reviews.user_id', id);

    return query.then((data) => {
        if (data.length > 0) {
            let newData = data[0]['created_at'];
            newData = JSON.stringify(newData);
            for (let i = 0; i < data.length; i++) {
                data[i].date = newData.split('T')[0];
                data[i].time = newData.split('T')[1];
                data[i].date = data[i].date.replace('"', '');
                data[i].time = data[i].time.replace('Z"', '');
                data[i].time = data[i].time.split('.')[0];
            }
        }
        return data;
    });
};

const getDiscount = (id) => {
    let query = knex('discount').select().where({ user_id: id });
    return query.then((data) => data);
};

const getPurchaseHistory = (id) => {
    let query = knex('bills')
        .select()
        .innerJoin('purchase', 'bills.id', 'purchase.bill_id')
        .innerJoin('beers', 'beers.id', 'purchase.beer_id')
        .where('bills.id', id)
        .where('purchase.bought', true);

    // let query = knex('purchase').select().where({ user_id: id, bought: true });
    return query.then((data) => data);
};

const getBill = (id) => {
    //TODO set where status is true

    let query = knex('bills')
        .select()
        .innerJoin('user_address', 'user_address.id', 'bills.delivery_address_id')
        .where('bills.user_id', id);

    return query.then((data) => data);
};

const getBeers = (id) => {
    let query = knex('beers').select().where({ id: id });
    return query.then((data) => data);
};

const getWishList = (id) => {
    let query = knex('favorite').select('beer_id').where({ user_id: id });
    query = knex.select('beer_name').from('beers').whereIn('id', query);

    return query.then((data) => data);
};

module.exports = {
    getInfo,
    getComment,
    getDiscount,
    getPurchaseHistory,
    getWishList,
    getUserAddress,
    getBeers,
    getBill,
};