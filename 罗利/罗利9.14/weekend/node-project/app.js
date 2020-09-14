const express = require("express");//引入express模块
const mysql = require("mysql");//引入mysql包
const bodyParser = require("body-parser");//post请求需要 body接受参数要引入的包
const app = express();//执行全局函数，返回一个服务

//设置解析器
//设置页面解析器
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));
//静态资源
app.use(express.static(__dirname + "/public", {
  index: '/userLogin.html'
}));

//定义接口
app.post("/userLogin",function (request,response) {
  //1、接收用户传递的参数
  var username = request.body.username;
  var pwd = request.body.password;
  console.log(username);
  console.log(pwd);

  //2、去数据库进行验证，然后返回相应的结果给用户
  //创建数据库链接
  var connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"manage"
  });
  //打开连接
  connect.connect();
  //操作数据库
  connect.query("select * from Stuff where StuffName=? and Pwd=?",[username,pwd],function (err,data) {
    //err:null 表示没有错误
    if (err){//err不为null,就会进入到if结构里
      console.log(err);
      response.send({code:500,message:"数据库异常"});
    }else{
      if(data.length>0){
        response.send({code:200,message:"登录成功",staffInfo:data[0]});
      }else {
        response.send({code:200,message:"用户名或密码错误"});
      }
    }
  })
  //关闭连接
  connect.end();
})

app.listen(8888,function () {
  console.log("服务已启动")
});
