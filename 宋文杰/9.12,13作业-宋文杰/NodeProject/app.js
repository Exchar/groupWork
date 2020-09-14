/**
 * Created by swj on 2020/9/13.
 */
//引用模块
const myexpress = require('express');
const mysql = require('mysql');//引入mysql包
const bodyParser = require('body-parser');//post请求需要body接受参数，需要引入的包
const app = myexpress();//执行全局函数，返回一个服务

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(myexpress.static(__dirname+"/public"));

//定义接口
app.post("/userLogin",function(request,response){
    //1.接收用户传递的参数
    var username = request.body.UserName;
    var pwd = request.body.Pwd;
    console.log(username);
    console.log(pwd);
    //2.去数据库进行验证，返回相应的结果给用户
    //创建数据库连接
    var connect = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:'',
        database:"manage"
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query("select * from Staff where StaffName=? and Pwd=?",
    [username,pwd],function(err,data){
            //err:null,表示没有错误
            if(err){//err不为null，就会进入到if结构
                console.log(err);
                response.send({code:500,message:"数据库异常"});
            }else{
                if(data.length>0){
                    response.send({code:200,message:"登陆成功",staffInfo:data[0]});
                }else{
                    response.send({code:200,message:"用户名或密码错误"});
                }
            }
        })
    //5.关闭连接
    connect.end();
})
//部门列表
app.post("/deptList",function(request,response){
    //1.去数据库查询部门信息
    //2.创建数据库连接
    var connect = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:'',
        database:"manage"
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query("select * from department", [],function(err,data){
        //err:null,表示没有错误
        if(err){//err不为null，就会进入到if结构
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else{
            response.send({code:200,data:data});
        }
    })
    //5.关闭连接
    connect.end();
})
//添加部门
app.post("/addDept",function(request,response){
    //1.接收参数
    var deptname = request.body.deptName;
    var descipt = request.body.deptDescript;

    //2.去数据库添加部门
    var connect = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:'',
        database:"manage"
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库,
    connect.query("insert into department(DeptName,DeptDescript) values (?,?)", [deptname,descipt],function(err,data){
        //err:null,表示没有错误
        if(err){//err不为null，就会进入到if结构
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else{
            //注：添加，删除，修改都不返回数据列表，返回的数据当前一个受影响的行数
            if(data.affectedRows>0){
                response.send({code:200,message:"添加成功"});
            }else{
                response.send({code:500,message:"添加失败"});
            }
        }
    })
    //5.关闭连接
    connect.end();
})
//删除部门
app.get("/delDept",function(request,response){
    //1.接收参数
    var deptNo = request.query.deptNo;

    //2.去数据库添加部门
    var connect = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:'',
        database:"manage"
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库,
    connect.query("update department set Status = 0 where DeptNo = ?",[deptNo],function(err,data){
        //err:null,表示没有错误
        if(err){//err不为null，就会进入到if结构
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else{
            //注：添加，删除，修改都不返回数据列表，返回的数据当前一个受影响的行数
            if(data.affectedRows>0){
                response.send({code:200,message:"删除成功"});
            }else{
                response.send({code:200,message:"删除失败"});
            }
        }
    })
    //5.关闭连接
    connect.end();
})

app.listen(8888,function(){
    console.log('服务已经启动');
});
