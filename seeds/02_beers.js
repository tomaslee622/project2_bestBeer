exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('beers')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('beers').insert([{
                    id: 1,
                    beer_name: "Jacky's Jumping Juice",
                    info: 'Japanese beer',
                    price: 20,
                    thumbnail: 'asset/product1.png',
                    volumn: 330,
                },
                {
                    id: 2,
                    beer_name: "Tom's Total Tipple",
                    info: 'Beer',
                    thumbnail: 'asset/product2.png',
                    price: 25,
                    volumn: 330,
                },
                {
                    id: 3,
                    beer_name: "Chris' Cracking Cask",
                    info: 'Dutch beer',
                    price: 25,
                    thumbnail: 'asset/product3.png',
                    volumn: 330,
                },
            ]);
        });
};