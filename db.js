const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'devansh',
  password: '1234',
  database: 'blogapp',
});

module.exports = connection;
