const { Pool } = require('pg');
const {db} = require('./config');

const pool = new Pool({
    host: db.host,
    user: db.user,
    password: db.password,
    port: db.port,
    database: db.database
});

module.exports = pool;
