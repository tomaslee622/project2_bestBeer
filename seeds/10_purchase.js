exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('purchase')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('purchase').insert([{
                    user_id: 1,
                    bill_id: 1,
                    beer_id: 2,
                    quantity: 5,
                    bought: true,
                },
                {
                    user_id: 1,
                    bill_id: 1,
                    beer_id: 1,
                    quantity: 3,
                    bought: false,
                },
                {
                    user_id: 2,
                    bill_id: 2,
                    beer_id: 3,
                    quantity: 3,
                    bought: true,
                },
            ]);
        });
};