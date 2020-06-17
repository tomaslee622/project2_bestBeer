exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{
                    email: 'test@test.com',
                    password: 'test',
                    noti: false,
                    first_name: 'Vincent',
                    last_name: 'Vega',
                },
                {
                    email: 'test2@test.com',
                    password: 'test2',
                    first_name: 'Peter',
                    last_name: 'Parker',
                    noti: true,
                },
            ]);
        });
};