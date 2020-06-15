const knex_function = require('./knex_function');

describe('Extracting data from database', () => {
    it('Extracting from users table', (done) => {
        knex_function.getData('users').then((userData) => {
            expect(userData.length).toBe(4);
            done();
        });
    });

    it('Extracting from beers table', (done) => {
        knex_function.getData('beers').then((userData) => {
            expect(userData).not.toBe(undefined);
            done();
        });
    });

    it('Extracting from beer_images table', (done) => {
        knex_function.getData('beer_images').then((userData) => {
            expect(userData).not.toBe(undefined);
            done();
        });
    });

    it('Extracting from favorite table', (done) => {
        knex_function.getData('favorite').then((userData) => {
            expect(userData).not.toBe(undefined);
            done();
        });
    });

    it('Extracting from reviews table', (done) => {
        knex_function.getData('reviews').then((userData) => {
            expect(userData).not.toBe(undefined);
            done();
        });
    });

    it('Extracting from stock table', (done) => {
        knex_function.getData('stock').then((userData) => {
            expect(userData).not.toBe(undefined);
            done();
        });
    });

    it('Extracting from user_address table', (done) => {
        knex_function
            .getData('user_address')
            .then((userData) => {
                expect(userData).not.toBe(undefined);
                done();
            })
            .finally(knex_function.destroy());
    });
});