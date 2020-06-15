exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { email: 'test@test.com', password: 'test', noti: false },
                { email: 'test2@test.com', password: 'test2', noti: true },
            ]);
        });
};