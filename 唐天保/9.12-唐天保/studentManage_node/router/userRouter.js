const { Router } = require('express');
const express = require('express');
const rout = express.Router();
const query = require('../utils/getSqlRes');

rout.post("/confirmUser", async function (req, res) {
    console.log(req.body.username);
    let username = req.body.username;
    let pwd = req.body.pwd;
    let sql = "select * from user where username =? and pwd =?";
    let info = await query.getInfo(sql, [username, pwd]).catch((err) => {
        console.log(err);
        res.send("服务器开小差了");
    })
    res.send(info)
})
rout.post("/getDeptList", async function (req, res) {
    let sql = "select * from department";
    let info = await query.getInfo(sql, []).catch((err) => {
        console.log(err);
        res.send("服务器开小差了");
    });
    res.send(info);
})
rout.post("/addDeptItem", async function (req, res) {
    let DeptName = req.body.DeptName;
    let DeptDescript = req.body.DeptDescript;
    let sql = "insert into department (DeptName,DeptDescript) values(?,?)";
    let info = await query.getInfo(sql, [DeptName,DeptDescript]).catch((err) => {
        console.log(err);
        res.send("服务器开小差了");
    })
    res.send(info)
});
rout.post("/delDeptItem", async function (req, res) {
    let DeptNo = req.body.DeptNo;
    let sql = "update department set Status= 0  where DeptNo=?";
    let info = await query.getInfo(sql, [DeptNo]).catch((err) => {
        console.log(err);
        res.send("服务器开小差了");
    })
    res.send(info);
});
rout.post("/editDeptItem", async function (req, res) {
    let status = req.body.status;
    let DeptNo = req.body.DeptNo;
    let DeptName = req.body.DeptName;
    let DeptDescript = req.body.DeptDescript;
    let sql = "update department set Status=?,DeptName=?,DeptDescript=?  where DeptNo=?";
    let info = await query.getInfo(sql, [status,DeptName,DeptDescript,DeptNo]).catch((err) => {
        console.log(err);
        res.send("服务器开小差了");
    })
    res.send(info);
});
module.exports = rout;