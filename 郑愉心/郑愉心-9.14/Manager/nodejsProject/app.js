const express = require('express');
const app = express();
const dairy = require('morgan');
const bodyParser = require('body-parser');
const mysql=require("mysql")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(dairy('dev'));
app.use(express.static(__dirname + '/public', { index: "/html/login.html" })); //静态数据文件
//定义接口
app.post("/userLogin", function(request, response) {
    var username = request.body.userName;
    var pwd = request.body.Pwd;
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'kindergarten'
    });
    conn.connect();
    conn.query("select * from Staff where StaffName=? and Pwd=?", [username, pwd], function(err, data) {
        if (err) {
            response.send({ code: 500, message: "数据库出错" });
        } else {
            if (data.length > 0) {
                response.send({ code: 200, message: '登录成功', StaffInfo: data[0] });
            } else {
                response.send({ code: 200, message: '用户名或密码错误' });
            }
        }
    });
    conn.end();
});
//部门列表
app.post("/deptList", function(request, response) {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'kindergarten'
    });
    conn.connect();
    conn.query("select * from department", [], function(err, data) {
        if (err) {
            response.send({ code: 500, message: "数据库出错" });
        } else {
                response.send({ code: 200, data:data });
        }
    });
    conn.end();
});
//添加部门列表
app.post("/addDept", function(request, response) {
    var deptname=request.body.deptName;
    var deptdescript=request.body.deptdescript;
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'kindergarten'
    });
    conn.connect();
    conn.query("insert into department(DeptName,DeptDescript) values(?,?)", [deptname,deptdescript], function(err, data) {
        if (err) {
            console.log(err)
            response.send({ code: 500, message: "数据库出错" });
        } else {
            if(data.affectedRows>0){
                response.send({ code: 200, message: "添加成功" });
        }else{
            response.send({ code: 200, message: "添加失败" });
        } 
            }
                
    });
    conn.end();
});
//删除
app.get("/delDept", function(request, response) {
    var deptNo=request.query.deptNo;
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'kindergarten'
    });
    conn.connect();
    conn.query("update department set Status = 0 where DeptNo = ?", [deptNo], function(err, data) {
        if (err) {
            console.log(err)
            response.send({ code: 500, message: "数据库出错" });
        } else {
            if(data.affectedRows>0){
                response.send({ code: 200, message: "删除成功" });
        }else{
            response.send({ code: 200, message: "删除失败" });
        } 
            }
                
    });
    conn.end();
});
//修改部门
app.post("/editDept", function(request, response) {
    var deptno=request.body.deptNo;
    var deptname=request.body.deptName;
    var deptdescript=request.body.deptDescript;
    var status=request.body.status;
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'kindergarten'
    });
    conn.connect();
    conn.query("update department set DeptName=?,DeptDescript=?,Status=? where DeptNo=?", [deptname,deptdescript,status,deptno], function(err, data) {
        if (err) {
            console.log(err)
            response.send({ code: 500, message: "数据库出错" });
        } else {
            if(data.affectedRows>0){
                response.send({ code: 200, message: "修改成功" });
        }else{
            response.send({ code: 200, message: "修改失败" });
        } 
            }
                
    });
    conn.end();
});
app.listen(8088, function() {
    console.log("服务已启动")
})