const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'mypassword',
  database: 'blogapp'
})

module.exports = connection; 