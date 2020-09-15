const mysal=require('mysql');
//连接数据库
function dbHelp(sql,parameter,fun){
    const conn=mysal.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'manage'
    })
    //打开链接
    conn.connect();
    //操作
    conn.query(sql,parameter,fun);
    //关闭
    conn.end();
}
module.exports={
    query:dbHelp
}