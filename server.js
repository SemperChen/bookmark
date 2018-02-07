let express = require('express');
let url = require('url');
let app = express();
let mysql  = require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    port: '3306',
    database: 'test',
});

connection.connect();
app.get('/login', function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // userDao.updateUser(connection,'菜鸟工具21','111111book2123123');
    let params = url.parse(req.url, true).query;
    login(params,res)

})
function login(params,res) {
    let  sql = 'SELECT * FROM users WHERE username="'+params.username+'"';
//查
    connection.query(sql,function (err, result) {
        if(err){
            // console.log('[SELECT ERROR] - ',err.message);
            // return;
        }
        // console.log('result',result,'err',err,);
        if(result.length===1&&result[0].username===params.username&&result[0].password===params.password){
            res.send({isLogin:true,msc:'登录成功！',user:result[0]});
        }else {
            res.send({isLogin:false,msc:'登录失败！用户名或密码错误'});
        }

    });
}
app.get('/register', function (req, res) {
    let params = url.parse(req.url, true).query;
    register(params,res)

})
function register(params,res) {
    let  sql = 'SELECT * FROM users WHERE username="'+params.username+'"';
//查
    connection.query(sql,function (err, result) {
        if(err){
            // console.log('[SELECT ERROR] - ',err.message);
            // return;
        }
        // console.log('result',result,'err',err,);
        if(result.length===0){
            let  addSql = 'INSERT INTO users(username,password,bookmark) VALUES(?,?,?)';
            let  addSqlParams = [params.username, params.password, params.bookmark];
//增
            connection.query(addSql,addSqlParams,function (err, result) {
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    return;
                }
                login(params,res)
            });
        }else {
            res.send({isRegisterSuccess:false,msc:'注册失败，用户名已存在！'});
        }

    });
}
function saveBookmark(params,res) {
    let  sql = 'SELECT * FROM users WHERE username="'+params.username+'"';
//查
    connection.query(sql,function (err, result) {
        if(err){
            // console.log('[SELECT ERROR] - ',err.message);
            // return;
        }
        // console.log('result',result[0],'err',err,);
        if(result.length===1&&result[0].username===params.username&&result[0].password===params.password){
            let modSql = 'UPDATE users SET bookmark = ? WHERE username = ?';
            let modSqlParams = [params.bookmark,params.username];
//改
            connection.query(modSql,modSqlParams,function (err, result) {
                if(err){
                    // console.log('[UPDATE ERROR] - ',err.message);
                    // return;
                }
                res.send({isSavedBookmark:true,isLogin:true,msc:'已同步到云书架！',user:params});
            });
        }else {
            res.send({isSavedBookmark:true,msc:'保存失败！'});
        }

    });
}
app.get('/save', function (req, res) {
    let params = url.parse(req.url, true).query;
    saveBookmark(params,res)

})

// connection.end();
let server = app.listen(8000, function () {
    let host = server.address().address;
    let port = server.address().port;

    // console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

