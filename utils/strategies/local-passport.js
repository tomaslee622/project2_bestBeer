const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

module.exports = () => {
    console.log('Local passport is set up');
    passport.use(
        'local-login',
        new LocalStrategy(async(username, password, done) => {
            try {
                let users = await knex('users').where({ email: username });
                if (users.length == 0) {
                    console.log("Don't have this email");
                    return done(null, false, { message: 'Incorrect credentials.' });
                }
                let user = users[0];
                console.log(user);
                if (user.password == null) {
                    return done(null, false, {
                        message: 'This email is linked with either Google or Facebook, please login using Google or Facebook.',
                    });
                }
                // Bcrypt implemented
                // if (await bcrypt.compare(password, user.password)) {
                //     console.log(password);
                //     console.log(user.password);
                //     return done(null, username);
                if (password == user.password) {
                    return done(null, username);
                } else {
                    console.log('Wrong password with local login');
                    return done(null, false, { message: 'Incorrect credentials.' });
                }
            } catch (err) {
                console.log('Catch error');
                return done(err);
            }
        })
    );
};