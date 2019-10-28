const { initDB } = require('./config/db');
const { startRestServer } = require('./config/restServer');

require('dotenv').config();

initDB()
  .then(startRestServer);
