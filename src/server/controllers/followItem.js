var express = require('express');
var router = express.Router();
let usermodels = require('./../models/userModel').userModel
//let itemmodels = require('./../models/itemModel').itemModel
router.post('/', (req, res) => {
  // console.log(req.body);
  let user = req.body.userName
  let itemId = req.body.itemId
  let itemName = req.body.itemName

  let itemFollow = `${itemName}/${itemId}`
  console.log(itemFollow);

  let it = req.body.it
  let user_followItem = []
  // console.log(itemId)
  usermodels.findOne({
    'user_account': user
  }, (err, doc) => {
    if (err) {
      res.send({
        status: '0'
      })
    }
    let item = doc.user_followItem
    for (var i in item) {
      user_followItem.push(item[i])
    }
    /*     console.log("__________" + user_followItem); //item
        console.log(user_followItem.length); */

  }).exec(function (err, doc) {

    if (it == "1") {
      console.log('关注');

      if (user_followItem.length != 0 && user_followItem.indexOf(itemId) >= 0) {
        console.log('item is already in  user_follow_item');
      } else {
        usermodels.updateOne({
          'user_account': user
        }, {
          $push: {
            user_followItem: itemFollow
          }
        }, (err, doc) => {
          if (err) {
            res.send({
              status: '0'
            })
          } else {
            res.send({
              status: '1'
            })
          }
        })
      }
    } else {
      console.log('取消关注');
      usermodels.updateOne({
        'user_account': user
      }, {
        $pull: {
          user_followItem: itemFollow
        }
      }, (err, doc) => {
        if (err) {
          res.send({
            status: '0'
          })
        } else {
          res.send({
            status: '1'
          })
        }

      })
    }



  })
  // if(user_followItem!=undefined)
  // if (it === "1") {
  /*   if(user_followItem[0] == undefined){
     usermodels.updateOne({
       'user_account': user
     }, {
       $push: {
         user_followItem: itemId
       }
     }, (err, doc) => {
       if (err) {
         res.send({
           status: '0'
         })
       } else {
         res.send({
           status: '1'
         })
       }
     })

    }
     else  */
  // console.log(user_followItem.length);



  // if (user_followItem != undefined && user_followItem.indexOf(itemId) >= 0) {
  //   console.log('item is already in  user_follow_item');
  // } else {
  //   usermodels.updateOne({
  //     'user_account': user
  //   }, {
  //     $push: {
  //       user_followItem: itemId
  //     }
  //   }, (err, doc) => {
  //     if (err) {
  //       res.send({
  //         status: '0'
  //       })
  //     } else {
  //       res.send({
  //         status: '1'
  //       })
  //     }
  //   })
  // }

  // } else {
  // if (user_followItem.indexOf(itemId) >= 0) {
  //   usermodels.updateOne({
  //     'user_account': user
  //   }, {
  //     $pull: {
  //       user_followItem: itemId
  //     }
  //   }, (err, doc) => {
  //     if (err) {
  //       res.send({
  //         status: '0'
  //       })
  //     } else {
  //       res.send({
  //         status: '1'
  //       })
  //     }
  //   })

  // }
})
module.exports = router;