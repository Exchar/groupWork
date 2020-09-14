const routes=require('express').Router();
const mysql=require('mysql');
//引用db.js
const db=require('./db');

//路由  登录
routes.post('/userLogin',function(request,response){ 
    //接收传递的参数
    var username=request.body.UserName;
    var pwd=request.body.Pwd;
    //操作数据库
    var sql='select * from staff where StaffName=? and Pwd=?';
    db.query(sql,[username,pwd],function(err,data){
        if(err){
            response.send({code:500,message:'数据库出错，联系管理员'});
        }else{
            if(data.length>0){
                response.send({code:500,message:'登录成功',staffInfo:data[0]});
            }else{
                response.send({code:500,message:'用户名或密码错误'});
            }
        }
    });
});

// 获取部门列表
routes.post('/deptList',function(request,response){
    //操作数据库
    var sql='select * from department';
    db.query(sql,[],function(err,data){
        if(err){
            response.send({code:500,message:'数据库出错，联系管理员'});
        }else{
            response.send({code:200,data:data});
        }
    });
})

//添加部门
routes.post('/addDept',function(request,response){
    //接收传递的参数
    var deptname=request.body.DeptName;
    var deptdescript=request.body.DeptDescript;

    var sql='insert into department(DeptName,DeptDescript) values(?,?)';
    db.query(sql,[deptname,deptdescript],function(err,data){
        if(err){
            response.send({code:500,message:'数据库出错，联系管理员'});
        }else{
            if(data.affectedRows>0){
                response.send({code:200,message:'添加成功'});
            }else{
                response.send({code:200,message:'添加失败'});
            }
        }
    });

})

//删除部门
routes.get('/delDept',function(request,response){
    var id=request.query.deptNo;
    const sql='update department set Status=0 where DeptNo=?';
    db.query(sql,[id],function(err,data){
        console.log(err);
        console.log(data);
        if(err){
            response.send({code:500,message:'数据库出错，联系管理员'});
        }else{
            if(data.affectedRows>0){
                response.send({code:200,message:'删除成功'});
            }else{
                response.send({code:200,message:'删除失败'});
            }
        }
    })
})


//修改部门
routes.post('/editDept',function(request,response){
    var deptNo=request.body.DeptNo;
    var deptname=request.body.DeptName;
    var deptdescript=request.body.DeptDescript;
    var status=request.body.Status;

    var sql='update department set DeptName=?,DeptDescript=?,Status=? where DeptNo=?';
    db.query(sql,[deptname,deptdescript,status,deptNo],function(err,data){
        if(err){
            response.send({code:500,message:'数据库出错，联系管理员'});
        }else{
            if(data.affectedRows>0){
                response.send({code:200,message:'修改成功'});
            }else{
                response.send({code:200,message:'修改失败'});
            }
        }
    });
})

//暴露
module.exports=routes;