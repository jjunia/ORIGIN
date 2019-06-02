var express = require('express');
var router = express.Router();
var usermodels = require('./../models/userModel').userModel
var itemmodels = require('./../models/itemModel').itemModel
// 音乐上传
router.post('/', (req, res) => {
  console.log(req.body);
  let user = req.body.userName
  let itemname = req.body.itemName
  let key =  req.body.key
  var date = new Date().toLocaleString(); // 当前日期
  let contents = {
    user_item_id: "",
    user_item_name: req.body.itemName,
    user_content_musicname: req.body.musicName,
    user_content_musicSinger: req.body.musicSinger,
    user_content_musicImg: req.body.musicImg,
    user_content_musicPlayUrl: req.body.musicPlayUrl,
    user_content_content: req.body.content,
    user_content_date: date,
    user_content_uploadType: req.body.uploadType
  }
  if (key == "1") {
    usermodels.updateOne({ user_account: user }, {
      $push: {
        user_private: contents
      }
    }, (err) => {
      if (err) {
        console.log(err);
        res.send({ status: "0" })
      }else{
        res.send({ status: "1" })
      }
    })
  } else {
    itemmodels.findOne({
      'item_name': itemname
    }, (err, doc) => {
      if (err) {
        res.send({
          status: "0"
        })
      }
      contents.user_item_id = doc._id
      // console.log(doc._id)

      usermodels.findOne({
        'user_account': user
      }, (err, doc) => {
        if (err) {
          res.send({
            status: '0'
          })
        }
        let user_item = doc.user_item
        // console.log(contents.user_item_id);  //item

        if (user_item.indexOf(contents.user_item_name) >= 0) {
          console.log('item is already in  user_item');
        } else {
          // console.log("++++++++++++++++++++++++++")
          let itemN = contents.user_item_name
          console.log(itemN)
          usermodels.updateOne({
            'user_account': user
          }, {
              $push: {
                user_item: itemN
              }
            }, (err, doc) => {
              if (err) {
                res.send({
                  status: '0'
                })
              } else {
                // console.log("Success");
              }
            })
        }
      })
      itemmodels.findOne({
        'item_name': itemname
      }, (err, doc) => {
        if (err) {
          res.send({
            status: "0"
          })
        }

        let itemauthor = doc.item_author

        if (itemauthor.indexOf(user) >= 0) {
          // console.log('user is already in  item_author');
        } else {

          itemmodels.updateOne({
            'item_name': itemname
          }, {
              $push: {
                item_author: user
              }
            }, (err) => {
              if (err) {
                res.send({
                  status: "0"
                })
              } else {
                // console.log("Author import Successfully");
              }
            })
        }
      })
      usermodels.updateOne({
        "user_account": user,
      }, {
          $push: {
            user_content: contents
          }
        }, (err) => {
          if (err) {
            res.send({
              status: "0"
            })
          } else {
            // console.log('发布成功');
            res.send({
              status: "1"
            })
          }
        })
    })
  }
})
module.exports = router;