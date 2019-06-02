var express = require('express');
var router = express.Router();
var usermodels = require('./../models/userModel').userModel

router.get('/', (req, res) => {
  let useraccount = req.query.account
  let content
  usermodels.findOne({
    user_account: useraccount
  }, (err, doc) => {
    if (err) {
      console.log('Error:' + err);
      res.send({ status: "0" })
    } else {
      content = doc.user_private.reverse()
      console.log(content);
      res.send({
        data: [{
          "content": content
        }],
      })
    }
  })
})
module.exports = router;