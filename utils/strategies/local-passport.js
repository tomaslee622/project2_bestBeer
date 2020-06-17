//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

module.exports = (app) => {
    passport.use(
        'local-login',
        new LocalStrategy(async(email, password, done) => {
            try {
                let users = await knex('users').where({ email: email });
                if (users.length == 0) {
                    return done(null, false, { message: 'Incorrect credentials.' });
                }
                let user = users[0];
                if (user.password == null) {
                    return done(null, false, {
                        message: 'This email is linked with either Google or Facebook, please login using Google or Facebook.',
                    });
                }
                if (user.password === password) {
                    console.log('successful login');
                    return done(null, email);
                } else {
                    return done(null, false, { message: 'Incorrect credentials.' });
                }
            } catch (err) {
                return done(err);
            }
        })
    );
};