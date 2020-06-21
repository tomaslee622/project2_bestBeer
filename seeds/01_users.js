exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([{
                    email: 'test@test.com',
                    password: '$2b$10$MB.r2gLWKRd6osbgGq6SXe5R2RPuhQuW8CDZWFucPpgUYpZgobjcC',
                    noti: false,
                    first_name: 'Vincent',
                    last_name: 'Vega',
                },
                {
                    email: 'test2@test.com',
                    password: '$2b$10$5sny8HstYKzy4dBsFV4upuAu5qZ.NpMA37mL9oFLj8TFutUqVqpWG',
                    first_name: 'Peter',
                    last_name: 'Parker',
                    noti: true,
                },
            ]);
        });
};