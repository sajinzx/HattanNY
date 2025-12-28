const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'localhost@123',
  database: 'hattan',
}).promise(); // <--- important!

module.exports = pool;