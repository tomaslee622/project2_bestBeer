// const knexConfig = require('./knexfile')['development'];
// const knex = require('knex')(knexConfig);

// let query = knex.schema.createTable('test', function(table) {
//     table.increments();
//     table.string('name');
//     table.timestamp('created_at', { precision: 0 }).defaultTo(knex.fn.now(0));
//     table.date('birthday');
// });

// query.then(() => {
//     let query2 = knex('test').insert({ name: 'jacky', birthday: '1995-06-02' });
//     console.log('successfully created table');
//     query2.then(() => {
//         console.log('Successfully created a row');
//     });
// });

require("dotenv").config();

console.log(process.env.GOOGLE_CLIENT_ID);