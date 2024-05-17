const mysql = require('mysql2');
const knex = require('knex');

const knexConfig = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'devansh',
    password: '1234',
    database: 'blogapp',
  },
};

const connection = knex(knexConfig);

module.exports = connection;

// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'devansh',
//   password: '1234',
//   database: 'blogapp',
// });

// module.exports = connection;
