const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const getData = (target) => {
    let query = knex(target).select();
    return query.then((data) => data);
};

module.exports = { getData };