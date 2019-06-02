var express = require('express');
var router = express.Router();
const path = require('path');

// const uploadPT = require('./../config/db').uploadModel;
const usermodels = require('./../models/userModel').userModel
const itemmodels = require('./../models/itemModel').itemModel
var formidable = require('formidable') // 表单解析

// 图文上传
router.post('/', (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, './../public/uploadPhoto')
  form.keepExtensions = true; //保存扩展名  

  form.parse(req, function (err, fields, files) { // 获取到form
    var imgPath = path.basename(files.file.path);
    let user = fields.name
    let itemName = fields.itemName
    var date = new Date().toLocaleString(); // 当前日期
    // console.log(itemName);

    let user_item
    let key = fields.key

    let contents = {
      user_item_id: '',
      user_item_name: fields.itemName,
      user_content_content: fields.content,
      user_content_date: date,
      user_content_photoUrl: imgPath,
      user_content_uploadType: fields.uploadType
    }
    if (key == "1") {
      usermodels.updateOne({
        user_account: user
      }, {
        $push: {
          user_private: contents
        }
      }, (err) => {
        if (err) {
          console.log(err);
          res.send({
            status: "0"
          })

        } else {
          res.send({
            status: "1"
          })
        }

      })
    } else {
      itemmodels.findOne({
        'item_name': itemName
      }, (err, doc) => {
        if (err) {
          console.log(err)
        } else {
          contents.user_item_id = doc._id
          usermodels.updateOne({
            "user_account": user,
          }, {
            $push: {
              user_content: contents
            }
          }, (err, doc) => {
            if (err) {
              console.log(err);
              res.send(err)
            } else {
              usermodels.findOne({
                user_account: user
              }, (err, doc) => {
                if (err) {
                  res.send({
                    status: '0'
                  })
                } else {
                  user_item = doc.user_item
                }
                if (user_item.indexOf(contents.user_item_name) >= 0) {
                  
                } else {
                  usermodels.updateOne({
                    'user_account': user
                  }, {
                    $push: {
                      user_item: itemName
                    }
                  }, (err, doc) => {
                    if (err) {
                      res.send({
                        status: '0'
                      })
                    } else {}
                  })}
                  res.send({
                    status: "1"
                  })
                  console.log('发布成功');
                }
              )
            }
          })
        }
      })
    }
  });



})

module.exports = router;