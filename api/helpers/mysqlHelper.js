class mysqlHelper{
    constructor(connection) {
        this.mysqlConn = connection;
    }

    getData(table, field = "*", filter, order, limit){
        return new Promise((resolve, reject) => {
            this.mysqlConn.getConnection((err, connection)=>{
                if (err) return reject(err);

                let sql = "select " + field + " from " + table;
                if (filter) {
                    sql = sql + " where " + filter;
                }
                if (order) {
                    sql = sql + " order by " + order;
                }
                if (limit) {
                    sql = sql + " limit " + limit;
                }
                connection.query(sql, function (err, result) {
                    connection.release();
                    if (err) return reject(err);

                    resolve({
                        data: result,
                        length: result.length,
                        success: true
                    });
                });
            });
        });
    }

    getOneData(table, field = '*', filter, order){
        return new Promise((resolve, reject) => {
            this.mysqlConn.getConnection((err, connection)=>{
                if (err) return reject(err);

                let sql = "select " + field + " from " + table;
                if (filter) {
                    sql = sql + " where " + filter;
                }
                if (order) {
                    sql = sql + " order by " + order;
                }
                sql = sql + "limit 1";
                connection.query(sql, function (err, result) {
                    connection.release();
                    if (err) return reject(err);

                    resolve({
                        data: result[0],
                        length: result.length,
                        success: true
                    });
                });
            });
        });
    }

    insertOneData(table, fields){
        return new Promise((resolve, reject) => {
            this.mysqlConn.getConnection((err, connection)=>{
                if (err) return reject(err);

                let sql = "insert into " + table + " set " + fields;
                connection.query(sql, function (err, result) {
                    connection.release();
                    if (err) return reject(err);

                    resolve({
                        insertId : result.insertId,
                        length: result.length,
                        success: true
                    });
                });
            });
        });
    }

    updateData(table, fields, filter, limit = 1){
        return new Promise((resolve, reject) => {
            this.mysqlConn.getConnection((err, connection)=>{
                if (err) return reject(err);

                let sql = "update " + table + " set " + fields;
                if (filter){
                    sql = sql + " where "+filter;
                }
                if (limit){
                    sql = sql+" limit "+limit;
                }else{
                    sql = sql+" limit 1";
                }
                connection.query(sql, function (err, result) {
                    connection.release();
                    if (err) return reject(err);

                    resolve({
                        affectedRows : result.affectedRows,
                        success: true
                    });
                });
            });
        });
    }

    deleteData(table, filter, limit = 1){
        return new Promise((resolve, reject) => {
            this.mysqlConn.getConnection((err, connection)=>{
                if (err) return reject(err);

                let sql = "delete from " + table + " where " + filter;
                if (limit){
                    sql = sql+" limit "+limit;
                }else{
                    sql = sql+" limit 1";
                }
                connection.query(sql, function (err, result) {
                    connection.release();
                    if (err) return reject(err);

                    resolve({
                        affectedRows : result.affectedRows,
                        success: true
                    });
                });
            });
        });
    }

    query(query){
        return new Promise((resolve, reject) => {
            this.mysqlConn.getConnection((err, connection)=>{
                if (err) return reject(err);

                connection.query(query, function (err, result) {
                    connection.release();
                    if (err) return reject(err);

                    resolve({
                        result : result,
                        success: true
                    });
                });
            });
        });
    }

    transactionQuery(query){
        return new Promise((resolve, reject) => {
            this.mysqlConn.getConnection((err, connection)=>{
                if (err) return reject(err);
                connection.beginTransaction(err => {
                    if (err) return reject(err);
                    connection.query(query, function (err, result) {
                        if (err) {
                            connection.rollback(function() {
                                return reject(err);
                            });
                        }
                        connection.commit(err=>{
                            if (err) {
                                connection.rollback(function() {
                                    return reject(err);
                                });
                            }
                            connection.release();

                            resolve({
                                result : result,
                                success: true
                            });
                        });
                    });
                });
            });
        });
    }
}

module.exports = mysqlHelper;