const mysql = require('mysql');
const logger = require('./logger');
const { mysqlUser, mysqlPassword, mysqlHost, mysqlDatabase, env } = require('./vars');

let mysqlConfig = {
    connectionLimit : 100,
    host            : mysqlHost,
    user            : mysqlUser,
    password        : mysqlPassword,
    database        : mysqlDatabase
}

if (env === 'development') {
    Object.assign(mysqlConfig, {debug:true});
}

const mysqlConn  = mysql.createPool(mysqlConfig);
mysqlConn.on('connection', function (connection) {
    logger.info('DB Connection established');

    connection.on('error', function (err) {
        logger.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
        logger.error(new Date(), 'MySQL close', err);
    });

});

module.exports = mysqlConn;