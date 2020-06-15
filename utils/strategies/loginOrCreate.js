const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

module.exports = (email, done, socialLoginID) => {
    let query = knex.select('*').from('users').where({ email: email });
    query
        .then((data) => {
            if (data.length == 1) {
                // This is a registered account logging in
                console.log('User exists, will login right now');

                // Social login
                if (socialLoginID) {
                    if (
                        socialLoginID['google_id'] == data[0].google_id ||
                        socialLoginID['facebook_id'] == data[0].facebook_id
                    ) {
                        console.log('A user logged in using social account');
                        return done(null, email);
                    } else {
                        // When existing Facebook user logged in first time using Google
                        if (socialLoginID['provider'] == 'google') {
                            let googleQuery2 = knex('users')
                                .update({
                                    google_id: socialLoginID['google_id'],
                                })
                                .where({ email: email });
                            googleQuery2
                                .then(() => {
                                    return done(null, email);
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return done(err);
                                });
                        } else {
                            // When existing Google user logged in first time using Facebook
                            let facebookQuery2 = knex('users')
                                .update({
                                    facebook_id: socialLoginID['facebook_id'],
                                })
                                .where({ email: email });
                            facebookQuery2
                                .then(() => {
                                    return done(null, email);
                                })
                                .catch((err) => {
                                    return done(err);
                                });
                        }
                    }
                }
            } else {
                // This is a non-registered account, using social login
                // Verify account using either Google or Facebook
                if (socialLoginID['provider'] == 'google') {
                    console.log('Creating a google login account for this user');
                    let googleQuery = knex('users').insert({
                        email: email,
                        google_id: socialLoginID['google_id'],
                    });
                    googleQuery.then(() => {
                        return done(null, email);
                    });
                } else if (socialLoginID['provider'] == 'facebook') {
                    console.log('Creating a google login account for this user.');
                    let facebookQuery = knex('users').insert({
                        email: email,
                        facebook_id: socialLoginID['facebook_id'],
                    });
                    facebookQuery.then(() => {
                        return done(null, email);
                    });
                } else {
                    console.log('Unexpected error in loginOrCreate.js');
                    return done(err);
                }
            }
        })
        .catch((err) => {
            return done(err);
        });
};