exports.up = function(knex) {
    return knex.schema.createTable('bills', function(table) {
        table.increments();
        table.timestamp('paid_at', { precision: 0 }).defaultTo(knex.fn.now(0));
        table.string('payment_method');
        table.integer('delivery_address_id');
        table.foreign('delivery_address_id').references('user_address.id');
        table.boolean('payment_status');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('bills');
};