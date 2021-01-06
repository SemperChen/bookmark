let express = require('express');
let url = require('url');
let app = express();
let mysql = require('mysql');
let bodyParser = require('body-parser');
const path = require('path')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Csp080147201',
    port: '3306',
    database: 'test',
});

connection.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))

app.get('/login', function (req, res) {
    let params = req.query;
    console.log("login params:",params,params.pageIndex,params.pageSize)
    login(params, res)

})

function login(params, res) {
    let  pageIndex = parseInt(params.pageIndex)
    let  pageSize = parseInt(params.pageSize)

    let sql = 'SELECT * FROM users limit '+(pageIndex-1)*pageSize+','+pageSize;
//查
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ',err.message);
            res.send({ok: false, msc: '查询失败！'+err.message});
            return;
        }
        if(result.length>0){
            res.send({ok: true, msc: '登录成功！', user: result});
        }

    });
}

app.post('/register', function (req, res) {
    register(req.body, res)

})

function register(params, res) {
    let addSql = 'INSERT INTO users(pid,platform,count1,count2) VALUES(?,?,?,?)';
    let addSqlParams = [params.pid, params.platform, params.count1, params.count2];
    //增
    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send({success: '插入失败！',ok:false,msc:err.message});
            return;
        }
        res.send({success: '插入成功！',ok:true});
    });
}

// connection.end();
let server = app.listen(8080, function () {
    let host = server.address().address;
    let port = server.address().port;

    // console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

