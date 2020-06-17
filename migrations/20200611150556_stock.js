exports.up = function(knex) {
    return knex.schema.createTable('stock', function(table) {
        table.increments();
        table.integer('beer_id').unsigned().notNullable();
        table.foreign('beer_id').references('beers.id');
        table.integer('stock').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('stock');
};