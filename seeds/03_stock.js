exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('stock')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('stock').insert([
                { beer_id: 1, stock: 1000 },
                { beer_id: 2, stock: 1000 },
                { beer_id: 3, stock: 1000 },
            ]);
        });
};