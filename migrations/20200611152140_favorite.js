exports.up = function(knex) {
    return knex.schema.createTable('favorite', function(table) {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.integer('beer_id').notNullable();
        table.foreign('user_id').references('users.id');
        table.foreign('beer_id').references('beers.id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('favorite');
};