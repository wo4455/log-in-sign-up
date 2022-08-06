const express = require('express');
const winston = require('winston');

const app = express();

require('dotenv').config();

require('./startup/logging')(); // logging first to catch errors
require('./startup/routes')(app);
require('./startup/static')(app);
require('./startup/config')(app);
require('./startup/db')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}`));