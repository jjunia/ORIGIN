var express = require('express');
var router = express.Router();
var usermodels = require('./../models/userModel').userModel
// const userjson = require('./../user.json')

router.post('/', function (req, res) {

  console.log(req.body.account);
  console.log(req.body.other);


  var account = req.body.account
  var other = req.body.other
  var rename
  var friends  
  usermodels.findOne({ user_account: account }, (err, doc) => {
    if (err) {
      res.send(err)
    } else {
      friends = doc.user_otheruser
      // console.log(friends)
      for (var i in friends) {
        if (friends[i].user_account == other) {
          rename = friends[i].user_rename
        }
      }
    }
  })
  usermodels.find({
    user_account: other
  }, (err, doc) => {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      console.log("Name_friend: " + doc)
      var friend = doc.shift()
      let userLike = friend.user_like
      let content = friend.user_content
      let userItem = friend.user_item

      console.log("USERITEM"+userItem);
      
      res.send({
        data: [{
          "userLike": userLike
        }, {
          "content": content
        }, {
          'rename': rename
        },{
          "userItem": userItem
        }],
        status: true
      })
    }
  })
})

module.exports = router;