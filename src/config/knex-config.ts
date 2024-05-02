const config = {
    client: 'mysql',
    connection: {
        host: 'dev.gulfcombustibles.com',
        user: 'root',
        password: 'AhoraDoctor2020',
        database: 'demo',
    },
    migrations: {
        directory: __dirname + '/knex/migrations',
    },
    seeds: {
        directory: __dirname + '/knex/seeds'
    }
}

module.exports = require('knex')(config);