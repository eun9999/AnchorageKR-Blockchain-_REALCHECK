const express = require('express');
const router = express.Router();
var request = require('request');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dmsrud1',
  database: 'login',
});
connection.connect(function (err) {
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  } else {
    console.log('연결 성공');
  }
});

const headers = {
  'content-type': 'text/plain;',
};

connection.query('SELECT * FROM userinfo', function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log('----', results);
});

router.get('/user/register', (req,res) => {
  connection.query('SELECT * FROM userinfo', function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    res.send(results);
  });
  
})
router.post('/user/register', (req, res) => {
  let userID = req.body.ID;
  let userPSWD = req.body.PSWD;
  console.log('data : ', userID, userPSWD);
  let sql = 'INSERT INTO userinfo (ID, PSWD) VALUES (?,?);';
  let checksql =
    'SELECT EXISTS (SELECT ID FROM userinfo WHERE ID=(?)) as success';
  connection.query(checksql, [userID], function (err, results) {
    console.log('isExists : ', results[0].success);
    if (err)
      return res.send({
        status: 'failed',
        data: {},
        msg: 'Something went wrong2 ${err}',
      });
    if (results[0].success == 0) {
      connection.query(sql, [userID, userPSWD], function (err, result) {
        if (err)
          return res.send({
            status: 'failed',
            data: {},
            msg: 'Something went wrong ${err}',
          });
        else {
          console.log('insert!');
          return res.send({
            status: 'success',
            data: req.body,
            msg: '회원가입 완료 !',
          });
        }
      });
    } else {
      console.log('이미 사용중인 ID입니다.');
      return res.send({
        status: 'failed',
        data: {},
        msg: '이미 사용중인 ID입니다.',
      });
    }
  });
});

router.post('/user/login', (req, res) => {
  let userID = req.body.ID;
  let userPSWD = req.body.PSWD;

  let checkID =
    'SELECT EXISTS (SELECT ID FROM userinfo WHERE ID=(?)) as success';
  let checkPSWD =
    'SELECT EXISTS (SELECT ID FROM userinfo WHERE ID=(?) AND PSWD=(?)) as success';

  connection.query(checkID, [userID], function (err, results) {
    console.log('checkID : ', results[0].success);
    if (err)
      return res.send({
        status: 'failed',
        data: {},
        msg: 'Something went wrong2 ${err}',
      });
    if (results[0].success == 1) {
      connection.query(checkPSWD, [userID, userPSWD], function (err, results) {
        if (err)
          return res.send({
            status: 'failed',
            data: {},
            msg: 'Something went wrong ${err}',
          });
        if (results[0].success == 1) {
          return res.send({
            status: 'success',
            data: {},
            msg: '로그인 성공 !',
          });
        } else {
          return res.send({
            status: 'failed',
            data: {},
            msg: '비밀번호가 틀렸습니다.',
          });
        }
      });
    } else {
      console.log('일치하는 ID가 없습니다.');
      return res.send({
        status: 'failed',
        data: {},
        msg: '일치하는 ID가 없습니다.',
      });
    }
  });
});

router.post('/listtransactions', (req, res) => {
  var ID = req.body.ID;
  var addr = req.body.addr;
  var txid = [];
  for(let i = 0; i < addr.length; i++){
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"listtransactions","params":["${addr[i]}",30,0,true]}`;
    var options = {
      url: `http://${USER}:${PASS}@127.0.0.1:18332/`,
      method: 'POST',
      headers: headers,
      body: dataString,
    };
    callback = (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = JSON.parse(body);
        console.log('!!!!!!!!!!!!!!!!!!!!!!!', data.result[0].txid);
        let checkDup = 'SELECT EXISTS (SELECT ID FROM txid WHERE ID=(?) AND TXID=(?)) as success'
        let sql = 'INSERT INTO txid (ID,TXID) VALUES(?,?)';
        connection.query(checkDup, [ID,data.result[0].txid], function (err, result) { //중복확인(TXID가 text type이라 unique같은거 못썼음)
          if(result[0].success == 1){
            console.log("이미 있는 id와 txid 입니다.");
          }
          else{
            connection.query(sql, [ID,data.result[0].txid], function (err, result) { //중복 row 없으면 insert
              if (err)
                console.log("error");
              else {
                console.log("txid 입력 완료 !");
                
              }
            });
          }
        });
      }
    };
    request(options, callback);
    if(i == addr.length-1){
      var txid = [];
      var data = [];
      let sql = 'SELECT TXID FROM txid WHERE ID=(?)';
      connection.query(sql, [ID] , function(err,result) {
        txid = result;
        console.log("data  : ", txid[0].TXID);
        console.log("data  : ", txid[1].TXID);
        console.log("data  : ", txid[2].TXID);
        
        for(let i = 0; i<txid.length; i++){
          var dataString2 = `{"jsonrpc":"1.0","id":"curltext","method":"gettransaction","params":["${txid[i].TXID}",true,true]}`;
          var options2 = {
            url: `http://${USER}:${PASS}@127.0.0.1:18332/`,
            method: 'POST',
            headers: headers,
            body: dataString2,
          };
          callback = (error, response, body) => {
            if (!error && response.statusCode == 200) {
              data.push(JSON.parse(body));
              console.log("gettransac", data);
              if(i==txid.length-1){
                res.send(data);
              }
            }
          };
          request(options2, callback);
        }
      })
    }
  }
});


router.get('/importaddress/:addr', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"importaddress","params":["${req.params.addr}","${req.params.addr}",false, false]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:18332/`,
    method: 'POST',
    headers: headers,
    body: dataString,
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
      console.log(data.result);
    }
  };
  request(options, callback);
});

// router.get('/gettransaction/:id', (req, res) => {
//   var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"gettransaction","params":["${req.params.id}",true,true]}`;
//   var options = {
//     url: `http://${USER}:${PASS}@127.0.0.1:18332/`,
//     method: 'POST',
//     headers: headers,
//     body: dataString,
//   };

//   callback = (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//       const data = JSON.parse(body);
//       res.send(data);
//     }
//   };
//   request(options, callback);
// });


//wallet 관련
router.get('/createwallet/:name', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"createwallet","params":["${req.params.name}"]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:18332/`,
    method: 'POST',
    headers: headers,
    body: dataString,
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
      console.log(data.result);
    }
  };
  request(options, callback);
});
router.get('/loadwallet/:wallet', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"loadwallet","params":["${req.params.wallet}"]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:18332/`,
    method: 'POST',
    headers: headers,
    body: dataString,
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
      console.log(data.result);
    }
  };
  request(options, callback);
});
router.get('/unloadwallet/:wallet', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"unloadwallet","params":["${req.params.wallet}"]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:18332/`,
    method: 'POST',
    headers: headers,
    body: dataString,
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
      console.log(data.result);
    }
  };
  request(options, callback);
});
router.get('/listwallets', (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"listwallets","params":[]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:18332/`,
    method: 'POST',
    headers: headers,
    body: dataString,
  };

  callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
      console.log(data.result);
    }
  };
  request(options, callback);
});
//connection.end();
module.exports = router;