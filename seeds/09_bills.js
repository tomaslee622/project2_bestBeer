exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('bills')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('bills').insert([{
                    user_id: 1,
                    method: 'card',
                    delivery_address_id: 1,
                },
                {
                    user_id: 2,
                    method: 'card',
                    delivery_address_id: 1,
                },
            ]);
        });
};