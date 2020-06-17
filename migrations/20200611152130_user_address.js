exports.up = function(knex) {
    return knex.schema.createTable('user_address', function(table) {
        table.increments();
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('users.id');
        table.boolean('default').notNullable();
        table.string('address').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user_address');
};