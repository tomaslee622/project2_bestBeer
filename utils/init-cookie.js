const passport = require('passport');
const session = require('express-session');
const knexConfig = require('../knexfile')['development'];
const knex = require('knex')(knexConfig);

module.exports = (app) => {
    // Need to set and use session before initialize it
    app.set('trust proxy', 1); // trust first proxy
    app.use(
        session({
            secret: 'beatles',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((email, done) => {
        console.log('Serializing ' + email);
        return done(null, email);
    });

    passport.deserializeUser((email, done) => {
        const query = knex('users').select('*').where({ email: email });
        query
            .then((user) => {
                console.log('Deserializing ' + user[0].email);
                return done(null, user[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    console.log('passport initilization finished');
};