exports.up = function(knex) {
    return knex.schema.createTable('beers', function(table) {
        table.increments();
        table.string('beer_name').notNullable();
        table.string('thumbnail');
        table.string('info');
        table.integer('price');
        table.integer('volumn');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('beers');
};