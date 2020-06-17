exports.up = function(knex) {
    return knex.schema.createTable('reviews', function(table) {
        table.increments();
        table.integer('user_id').notNullable();
        table.integer('beer_id').notNullable();
        table.foreign('user_id').references('users.id');
        table.foreign('beer_id').references('beers.id');
        table.string('content').notNullable();
        table.decimal('rating', 2, 1).notNullable();
        table.string('img_path');
        table.integer('upvote');
        table.integer('downvote');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
};