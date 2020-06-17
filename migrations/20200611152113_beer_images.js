exports.up = function(knex) {
    return knex.schema.createTable('beer_images', function(table) {
        table.increments();
        table.integer('beer_id').unsigned().notNullable();
        table.foreign('beer_id').references('beers.id');
        table.string('img_path').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('beer_images');
};