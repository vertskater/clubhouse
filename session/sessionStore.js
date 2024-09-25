const pgPool = require('../db/pool');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);

const sessionStore = new PgSession({
  pool: pgPool,
  tableName: 'user_session',
  createTableIfMissing: true,
})

module.exports = sessionStore;

