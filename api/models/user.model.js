const logger = require('../../config/logger');
const mysqlPool = require('../../config/mysql');
const mysqlHelper = require('../helpers/mysqlHelper');
const APIError = require('../errors/api-error');
const mysqlConn = new mysqlHelper(mysqlPool);

exports.findAndGenerateToken = async (data) =>{
    let username = data.username;
    let password = data.password;
    let check = await mysqlConn.getOneData("tbl_member", "password", "username = "+mysqlPool.escape(username), "id ASC").catch(err =>{ logger.error(err);return {success: false, error: err}});
    if (!check.success){
        throw new APIError({ message: 'failed - response server error. Err code: TKN00001'});
    }
    if (check.length <= 0){
        return reject(Error("failed - user not found."));
    }
    return true;
}