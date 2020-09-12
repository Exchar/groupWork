const db = require("./dbUtils");
function getInfo(sql, param) {
    return new Promise((resolve, reject) => {
        db.query(sql, param, (err, data) => {
            if (err) {
                console.log(err)
                reject({code:500,err:err});
            } else {
                console.log(data)
                resolve({code:200,data:data});
            }
        })
    })
}

module.exports = {getInfo:getInfo}