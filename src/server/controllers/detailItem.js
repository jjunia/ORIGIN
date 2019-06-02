var express = require('express');
var router = express.Router();
// var itemmodel = require('./../models/itemModel').itemModel
var usermodels = require('./../models/userModel').userModel

router.get('/', function (req, res) {

  var itemid = req.query.item_id
  var account = req.query.account

  let content = []   //用于处理存储查询的到的内容
  let contents = []  //返回前端的用于发布的内容
  let friendAccount = [] //数组用于存储已经添加备注的用户的标识

 /*  查询所有匹配标签的用户生成的内容 */
  usermodels.aggregate().unwind('user_content')
    .match({
      'user_content.user_item_id': itemid
    })
    .sort({
      'user_content.user_content_date': -1
    }).exec(
      (err, doc) => {
        if (err) {
          console.log(err)
          res.send(err)
        } else {
          var i = 0
          while (doc[0] != null) {
            content[i] = doc.shift();
            i++;
          }
          // 查询用户是否关注了标签
          usermodels.findOne({
            'user_account': account
          }, (err, doc) => {
            if (err) {
              console.log(err)
              res.send(err)
            } else {

              let fol = doc.user_followItem  //用户已经关注的标签 数组 列表
              let friend = doc.user_otheruser //用户添加备注的用户对象
              // console.log("Friend:______-"+friend.length);

              /* 把用户已经添加备注的其他用户的用户account存进数组中 */
              for (var i = 0; i < friend.length; i++) {
                friendAccount.push(friend[i].user_account)
                //  console.log("Friend_Account:____"+friendAccount.indexOf('a'));
              }
              // console.log("______________"+content.length);

              
              for (var i in content) {
                let partner = content[i].user_account
                let staff = { user_account: content[i].user_account }
                let cont = { user_content: content[i].user_content }
                if (friendAccount.indexOf(partner) == -1) {
                  // console.log("22222222222222");
                  var data = Object.assign(staff, cont)
                  contents.push(data)
                } else {
                  // console.log("11111111111");
                  var j = friendAccount.indexOf(partner)
                  let rename = {rename:friend[j].user_rename}
                  // console.log("RENAME"+rename);
                  
                  var data = Object.assign(staff, cont, rename)
                  contents.push(data)
                }
              }
              res.send({
                data: [{
                  "content": contents
                }, {
                  "fol": fol
                }, {
                  "rename": friend
                }],
              })
            }
          })

        }
      })
})

module.exports = router;