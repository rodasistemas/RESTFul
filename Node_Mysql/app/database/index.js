const db = require("knex")({
  client: 'mysql',
  connection:{
    host: '127.0.0.1',
    user: 'motoroute',
    password: 'motoroute',
    database: 'motoroute'
  }
});

module.exports = db;
