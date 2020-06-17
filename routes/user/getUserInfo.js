const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const getInfo = (id) => {
    let query = knex('users').select().where({ id: id });
    return query.then((data) => data);
};

const getComment = (id) => {
    let query = knex('reviews').select().where({ user_id: id });
    return query.then((data) => data);
};

const getDiscount = (id) => {
    let query = knex('discount').select().where({ user_id: id });
    return query.then((data) => data);
};

const getPurchaseHistory = (id) => {
    let query = knex('purchase').select().where({ user_id: id, bought: true });
    return query.then((data) => data);
};

const getWishList = (id) => {
    let query = knex('favorite').select().where({ user_id: id });
    return query.then((data) => data);
};

module.exports = {
    getInfo,
    getComment,
    getDiscount,
    getPurchaseHistory,
    getWishList,
};