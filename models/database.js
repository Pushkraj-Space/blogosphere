const {createPool} = require('mysql')
const db = require('../config/db')
const pool = createPool({
    host : db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    connectionLimit : db.connectionLimit,
    port : db.port
})

module.exports = pool;