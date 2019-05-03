let express = require('express');
let url = require('url');
let app = express();
let mysql  = require('mysql');
let bodyParser = require('body-parser');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Csp080147201',
    port: '3306',
    database: 'test',
});

connection.connect();

app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', function (req, res) {
    let params = req.body;
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
app.post('/register', function (req, res) {
    register(req.body,res)

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
            let  addSql = 'INSERT INTO users(username,password,collection) VALUES(?,?,?)';
            let  addSqlParams = [params.username, params.password, params.collection];
//增
            connection.query(addSql,addSqlParams,function (err, result) {
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    return;
                }
                login(params,res)
            });
        }else {
            res.send({isLogin:false,msc:'注册失败，用户名已存在！'});
        }

    });
}
function saveCollection(params,res) {
    let  sql = 'SELECT * FROM users WHERE username="'+params.username+'"';
//查
    connection.query(sql,function (err, result) {
        if(err){
            // console.log('[SELECT ERROR] - ',err.message);
            // return;
        }
        // console.log('result',result[0],'err',err,);
        if(result.length===1&&result[0].username===params.username&&result[0].password===params.password){
            let modSql = 'UPDATE users SET collection = ? WHERE username = ?';
            let modSqlParams = [params.collection,params.username];
//改
            connection.query(modSql,modSqlParams,function (err, result) {
                if(err){
                    // console.log('[UPDATE ERROR] - ',err.message);
                    // return;
                }
                res.send({isSavedCollection:true,isLogin:true,msc:'已同步！',user:params});
            });
        }else {
            res.send({isSavedCollection:true,msc:'保存失败！'});
        }

    });
}
app.post('/save', function (req, res) {
    saveCollection(req.body,res)

})

app.get('/data', function (req, res) {
    let  sql = 'SELECT * FROM videos';
//查
    connection.query(sql,function (err, result) {
        if(err){
            // console.log('[SELECT ERROR] - ',err.message);
            // return;
        }
        // console.log('result',result,'err',err,);
        if(result.length>0){
            res.send(result);
        }else {
            res.send([]);
        }

    });

})

// connection.end();
let server = app.listen(8000, function () {
    let host = server.address().address;
    let port = server.address().port;

    // console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

