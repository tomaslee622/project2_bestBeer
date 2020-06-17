exports.up = function(knex) {
    return knex.schema.createTable('beers', function(table) {
        table.increments();
        table.string('beer_name').notNullable();
        table.string('info');
        table.string('thumnail');
        table.integer('price');
        table.integer('volumn');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('beers');
};