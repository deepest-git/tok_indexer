// import knex from 'knex'

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'pass123',
        database: 'ether'
    }
});

const setupDB = () => {
    knex.raw("CREATE TABLE IF NOT EXISTS ether.tok_logs (from_addr VARCHAR(255),to_addr VARCHAR(255),value FLOAT,token_addrs VARCHAR(255))")
    .then(msg=>console.log(msg))
    console.log('db setup');
}

module.exports = { setupDB, knex }