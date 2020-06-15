exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('beers')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('beers').insert([
                { id: 1, beer_name: 'Asahi', info: 'Japanese beer', price: 20 },
                { id: 2, beer_name: 'TsingTao' },
                { id: 3, beer_name: 'Carlsberg', info: 'Dutch beer' },
                { id: 4, beer_name: 'Kirin', price: 25 },
            ]);
        });
};