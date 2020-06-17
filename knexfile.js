require("dotenv").config();

module.exports = {
    development: {
        client: "postgresql",
        connection: {
            host: process.env.DB_IP,
            database: "project2",
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            port: 5432, // Not masking it, you know anyway
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    test: {
        client: "postgresql",
        connection: {
            host: process.env.DB_IP,
            database: "project2_test",
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            port: 5432, // Not masking it, you know anyway
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};