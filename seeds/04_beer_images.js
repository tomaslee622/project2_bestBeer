exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('beer_images')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('beer_images').insert([{
                    beer_id: 1,
                    img_path: 'https://cdn.shopify.com/s/files/1/2597/8324/products/179100068-1-asahi-super-dry-beer-alc-5-350ml.jpg?v=1562904675',
                },
                {
                    beer_id: 4,
                    img_path: 'https://www.nipponandco.fr/13802-large_default/japanese-kirin-beer-in-bottle-kirin-ichiban-bottle.jpg',
                },
            ]);
        });
};