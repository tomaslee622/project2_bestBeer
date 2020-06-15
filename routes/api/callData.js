const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

let stock;

let query = knex('stock').select();
query.then((data) => {
    console.log(data);
    stock = data;
});