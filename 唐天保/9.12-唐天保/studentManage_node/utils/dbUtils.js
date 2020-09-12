const mysql = require("mysql");


function dbConn(sql,param,callback) {
    let conn = mysql.createConnection({
        host:"127.16.6.236",
        user:"root",
        password:"",
        port:3306,
        database:"manage"
    })
    conn.connect();
    conn.query(sql,param,callback)
    conn.end()

}

module.exports = {query:dbConn}
