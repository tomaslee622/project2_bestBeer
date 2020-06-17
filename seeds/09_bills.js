exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('bills')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('bills').insert([{
                    method: 'card',
                    delivery_address_id: 1,
                },
                {
                    method: 'card',
                    delivery_address_id: 1,
                },
            ]);
        });
};