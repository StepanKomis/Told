const mysql = require('mysql');
const conn = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
})

module.exports = conn;