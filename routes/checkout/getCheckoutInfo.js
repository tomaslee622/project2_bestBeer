const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const getAddress = (id) => {
    let query = knex('users').select('address').where({ id: id });
    return query.then((data) => data);
};

module.exports = { getAddress };