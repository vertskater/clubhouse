const {Pool} = require('pg');

const pgPool = new Pool({
  host: process.env.HOST,
  port: process.env.PGPORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

module.exports = pgPool;