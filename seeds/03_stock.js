exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('stock')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('stock').insert([
                { beer_id: 1, stock: 10 },
                { beer_id: 2, stock: 25 },
                { beer_id: 3, stock: -10 },
            ]);
        });
};