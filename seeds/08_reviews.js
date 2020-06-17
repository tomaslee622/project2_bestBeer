exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('reviews')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('reviews').insert([{
                    user_id: 1,
                    beer_id: 1,
                    content: 'This tastes terrible',
                    img_path: 'https://manofmany.com/wp-content/uploads/2019/10/Funniest-Names-for-Being-Drunk-2.jpg',
                    rating: 2.5,
                    upvote: 100,
                    downvote: 20,
                },
                {
                    user_id: 2,
                    beer_id: 1,
                    content: 'Tasty!',
                    rating: 4.5,
                    upvote: 0,
                    downvote: 32,
                },
                {
                    user_id: 1,
                    beer_id: 2,
                    content: 'Damn it! What a crap',
                    rating: 3.5,
                    upvote: 21,
                    downvote: 52,
                },
                {
                    user_id: 2,
                    beer_id: 3,
                    content: 'dsfjdsoifjdisojfiosfjdso < (drunk)',
                    rating: 3.5,
                    upvote: 21,
                    downvote: 52,
                },
            ]);
        });
};