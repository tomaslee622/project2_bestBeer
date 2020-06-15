exports.up = function(knex) {
    return knex.schema.createTable('discount', function(table) {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.string('code').notNullable();
        table.boolean('used').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('discount');
};