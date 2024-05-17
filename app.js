const express = require('express');
const routes = require('./routes/index');
const connection = require('./db');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const body_parser = require('body-parser');
const Curl = require('curl-logger');

global.__basedir = path.resolve(__dirname);

const app = express();
app.use(express.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(new Curl({ createFile: true }).logCurl);

const port = 3000;

app.use('/api/v1', routes);

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log('Connected to MySQL');
//   });
// });

connection
  .select()
  .from('blog')
  .then((rows) => {
    app.listen(port, () => {
      console.log(`Server is running in port ${port}`);
      console.log('Connected to Mysql using knex ');
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

