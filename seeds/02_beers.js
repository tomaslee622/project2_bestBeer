exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('beers')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('beers').insert([{
                    id: 1,
                    beer_name: "Jacky's Jumping Juice",
                    info: 'A zesty, energy-filled pale ale, perfect for the heat of the summer! Evoking the leisurely meander of fluffy clouds, our latest interpretation of a wheat beer is delightfully smooth and refreshing.',
                    price: 20,
                    thumbnail: 'asset/product1.png',
                    volumn: 330,
                },
                {
                    id: 2,
                    beer_name: "Tom's Total Tipple",
                    info: 'An easy-drinking lager, flexible for any occasion. Evoking the leisurely meander of fluffy clouds, our latest interpretation of a wheat beer is delightfully smooth and refreshing.',
                    thumbnail: 'asset/product2.png',
                    price: 25,
                    volumn: 330,
                },
                {
                    id: 3,
                    beer_name: "Chris' Cracking Cask",
                    info: 'Brewed with an elegant grain bill of flaked and malted wheat as the base, Fleeting Clouds is infused with Mandarin Orange Peel and scented with fresh ground coriander seeds.',
                    price: 25,
                    thumbnail: 'asset/product3.png',
                    volumn: 330,
                },
            ]);
        });
};