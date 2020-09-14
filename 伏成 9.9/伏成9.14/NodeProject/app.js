//引用express
const express=require('express');
//引用模块
// const favicon=require('serve-favicon');
const post=require('body-parser');
const mysql=require('mysql');
//引用路由
const useRoutes=require('./routes/user');
//搭建服务
var server=express();
//使用模块
//post传参转化
server.use(post.json());
server.use(post.urlencoded({extended:false}));
//使用路由
server.use(useRoutes);
//静态文件
server.use(express.static(__dirname+'/public'));
//监听
server.listen(8888,function(){
    console.log("服务已启动");
});