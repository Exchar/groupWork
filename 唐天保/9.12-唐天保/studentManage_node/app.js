const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyparser = require('body-parser');
const loginRouter = require('./router/userRouter');
const app = express(); //执行express的全局函数，返回一个服务对象

app.use(logger('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'))

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})

//设置页面解析器
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(loginRouter);
app.use(express.static(__dirname + '/public', {index:"userLogin.html"}));


app.listen(5900);