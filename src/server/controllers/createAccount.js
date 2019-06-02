var express = require('express');
var router = express.Router();

const usermodels = require('../models/userModel').userModel;

// 创建账号
router.post('/', (req, res) => {
  let newAccount = new usermodels({
    _id: 'user',
    user_account: req.body.account,
    user_password: req.body.password
  }) //查询该账号是否已经被注册  
  // console.log(newAccount)
  usermodels.count({
    "user_account": newAccount.user_account
  }, (err, docs) => {
    // console.log(docs)
    if (err) {
      console.log("Error:" + err)
      res.send(err)
    } else {
      console.log("Docs:" + docs)    
      if (docs >= 1) {
        //账号已经被注册，注册失败，返回code = 2    
        console.log("注册失败")
        res.send({
          code: 2, // 账号已存在
        })
      } else {
        // 账号未注册,保存数据newAccount数据进mongoDB，注册成功,返回code=1    
        usermodels.create(newAccount,function(err, data){
          if (err) {
            res.send(err)
          } else {
            res.send({
              code: 1, //注册成功
            })
          }
        })
      }
    }
  })
})

module.exports = router;