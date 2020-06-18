exports.up = function(knex) {
    return knex.schema.createTable('bills', function(table) {
        table.increments();
        table.timestamp('paid_at');
        table.string('method').defaultTo('card');
        table.integer('user_id');
        table.foreign('user_id').references('users.id');
        table.integer('delivery_address_id');
        table.foreign('delivery_address_id').references('user_address.id');
        table.boolean('status').defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('bills');
};