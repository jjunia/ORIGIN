var express = require('express');
var router = express.Router();
var usermodels = require('./../models/userModel').userModel
const jwt = require('jsonwebtoken') 

// 登录 验证
router.post('/', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了
  let newAccount = {
    account: req.body.account,
    password: req.body.password
  }
  //  console.log("login:" + req.body.account)
  // console.log(newAccount) 
  //查询该账号是否存在  
  usermodels.findOne({
    user_account: req.body.account
  }, (err, docs) => {
    if (err) {
      console.log("Error:" + err)
      res.send(err)
    } else {
      // console.log("Docs:" + docs)
      if (!docs == "") {
        // 若存在，再验证账号密码是否正确 
         
        if (docs.user_password === newAccount.password) {
          const payload = {
            name: newAccount.account,
          }
          // console.log(payload)
          const secret = 'Origin' // 密匙

          const token = jwt.sign(
            payload, secret, {
              expiresIn: '3600s'
            } //1小时
          )
          res.send({
            code: 1, // 登录成功，返回code = 1  
            token: token
          })
        } else {
          res.send({
            code: -1 // 密码错误
          })
        }
      } else {
        res.send({
          code: -2 // 账号不存在
        })
      }
    }
  })
});

// 验证jsonwebtoken是否过期的中间件，在login接口后面执行，除了login接口的请求外，其他接口都需要验证token
router.use(function jwtVerify(req, res, next) { // 拦截请求, 检查验证token
  let token = req.headers['authorization']
  // console.log(token)
  var cert = 'Origin'
  // 先解密
  if (token) {
    jwt.verify(token, cert, function (err, decoded) {
      if (err) {
        // console.log(err)
        console.log("token验证信息存在错误")
        res.send({
          status: false
        })
      } else {
        // req.decoded = decoded
        // console.log(decoded)
        next() // token验证通过 放行
      }
    })
  } else {
    res.send({
      status: false
    })
    // console.log("用户验证信息已过期")
  }
});

module.exports = router;