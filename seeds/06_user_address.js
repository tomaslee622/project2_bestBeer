exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('user_address')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('user_address').insert([
                { user_id: 1, address: 'Whompoa', default: true },
                { user_id: 2, address: 'Hung Hom', default: false },
            ]);
        });
};