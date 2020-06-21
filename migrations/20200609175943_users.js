exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('email').unique().notNullable();
        table.string('password');
        table.string('first_name');
        table.string('last_name');
        table.string('phone');
        table.string('propic_path');
        table.string('google_id');
        table.string('address');
        table.string('facebook_id');
        table.boolean('noti').defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};