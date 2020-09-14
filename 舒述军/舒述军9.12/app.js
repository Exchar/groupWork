const myexpress=require("express");
const mysql=require("mysql");
const bodyParser=require("body-parser");
const app=myexpress();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(myexpress.static(__dirname+"/public"));
//登录
app.post("/userLogin",(request,response)=>{
  //接收参数
  let userName=request.body.UserName;
  let pwd=request.body.Pwd;
  //创建数据库连接
  let connect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"960288546",
    database:"manage"
  })
  //打开连接
  connect.connect();
  //操作数据库
  connect.query("select * from Staff where StaffName=? and Pwd=?",[userName,pwd],(err,data)=>{
    if (err) {
      console.log(err);
      response.send({code:500,message:"数据库异常，请联系管理员"});
    }
    else {
      if (data.length>0) {
        response.send({code:200,message:"登录成功",staffInfo:data[0]});
      }
      else {
        response.send({code:200,message:"用户名或密码错误"});
      }
    }
  })
  connect.end();
});
//部门列表
app.post("/deptList",(request,response)=>{
  //数据库查询信息
  //创建数据库连接
  let connect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"960288546",
    database:"manage"
  })
  //打开连接
  connect.connect();
  //操作数据库
  connect.query("select * from department",[],(err,data)=>{
    if (err) {
      console.log(err);
      response.send({code:500,message:"数据库异常，请联系管理员"});
    }
    else {
      response.send({code:200,data:data});
    }
  })
  connect.end();
})
//添加部门
app.post("/addDept",(request,response)=>{
  //接收参数
  let deptName = request.body.deptName;
  let descript = request.body.deptDescipt;
  //创建数据库连接
  let connect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"960288546",
    database:"manage"
  })
  //打开连接
  connect.connect();
  //操作数据库
  connect.query("insert into department(DeptName,DeptDescript) values(?,?)",[deptName,descript],(err,data)=>{
    if (err) {
      console.log(err)
      response.send({code:500,message:"数据库出错"});
    }
    else {
      if (data.affectedRows>0) {
        response.send({code:200,message:"添加成功"});
      }
      else {
        response.send({code:200,message:"添加失败"});
      }
    }
  })
  connect.end();
})
//删除部门
app.get("/delDept",(request,response)=>{
  //接收参数
  let deptNo = request.query.deptNo;
  //创建数据库连接
  let connect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"960288546",
    database:"manage"
  })
  //打开连接
  connect.connect();
  //操作数据库
  connect.query("update department set Status=0 where DeptNo=?",[deptNo],(err,data)=>{
    if (err) {
      console.log(err)
      response.send({code:500,message:"数据库出错"});
    }
    else {
      if (data.affectedRows>0) {
        response.send({code:200,message:"删除成功"});
      }
      else {
        response.send({code:200,message:"删除失败"});
      }
    }
  })
  connect.end();
})
//修改部门
app.post("/editDept",(request,response)=>{
  //接收参数
  let deptName = request.body.deptName;
  let descript = request.body.deptDescript;
  let deptNo = request.body.deptNo;
  let status = request.body.status;
  //创建数据库连接
  let connect=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"960288546",
    database:"manage"
  })
  //打开连接
  connect.connect();
  //操作数据库
  connect.query("update department set DeptName=?,DeptDescript=?,Status=? where DeptNo=?",[deptName,descript,status,deptNo],(err,data)=>{
    if (err) {
      console.log(err)
      response.send({code:500,message:"数据库出错"});
    }
    else {
      if (data.affectedRows>0) {
        response.send({code:200,message:"修改成功"});
      }
      else {
        response.send({code:200,message:"修改失败"});
      }
    }
  })
  connect.end();
})
app.listen(8888,function (){
  console.log("服务已经启动！");
})