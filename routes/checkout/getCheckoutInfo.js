const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const getAddress = (id) => {
    let query = knex('user_address').select().where({ user_id: id });
    return query.then((data) => data);
};

module.exports = { getAddress };