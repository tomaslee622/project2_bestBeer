exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('discount')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('discount').insert([
                { user_id: 1, code: 'STUPID123', used: true },
                { user_id: 2, code: 'SMARTASS321', used: false },
            ]);
        });
};