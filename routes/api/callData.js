const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const getData = (target) => {
    let query = knex(target).select();
    return query.then((data) => data);
};

const getUserPurchase = (id) => {
    console.log('getUserPurchase is called');
    let query = knex('purchase').select().where({ user_id: id, bought: false });
    return query.then((data) => data);
};

// module.exports = { getData, getUserPurchase };