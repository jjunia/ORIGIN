var express = require('express');
var router = express.Router();
//var itemmodels = require('./../models/itemModel').itemModel
var usermodels = require('./../models/userModel').userModel

router.get('/', (req, res) => {

  let useraccount = req.query.account
  let userFollow = []
  let follow = []
  usermodels.find({
    user_account: useraccount
  }, (err, doc) => {
    if (err) {
      console.log(err)
      // res.send(err)
    }
    // console.log(doc);

    let user = doc.shift()
    follow = user.user_followItem

     console.log(follow);
    for (var i in follow) {
      userFollow[i] = {
        name: follow[i],
      }
    }

    res.send({
      data: [{
        "userFollow": userFollow
      }],
    })
  })
})

module.exports = router;