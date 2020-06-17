exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('purchase')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('purchase').insert([
                { bill_id: 1, beer_id: 2, quantity: 5, price: 200, bought: false },
                { bill_id: 1, beer_id: 3, quantity: 2, price: 12, bought: true },
                { bill_id: 1, beer_id: 2, quantity: 3, price: 43, bought: true },
            ]);
        });
};