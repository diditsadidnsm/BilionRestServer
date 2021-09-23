console.log("\x1b[34m", 'Restart bilion Socket Server');
Promise = require('bluebird');
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const server = require('http').createServer(app);

// listen to requests
server.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;