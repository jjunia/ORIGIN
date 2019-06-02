var express = require('express');
var router = express.Router();
var itemmodels = require('./../models/itemModel').itemModel
var usermodels = require('./../models/userModel').userModel


router.get('/',(req, res)=>{
  itemmodels.find().sort({
    item_browse: -1
  }).exec((err, doc) => {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      let hotItem = []
      for (var i in doc) {
        hotItem[i] = {
          item_id:doc[i]._id,
          item_name: doc[i].item_name,
          item_browse: doc[i].item_browse
        }
      }
      hotItem.pop()
      // console.log(hotItem)
      res.send(hotItem)
    }
  })
/*   usermodels.aggregate().unwind('user_content')
    .match({'user_content.user_item_id':'Music'})
    .sort({
    'user_content.user_content_date': 1
  }).exec()
  .then(function(err,doc){
    if(err){
      console.log(err)
      res.send(err)
    }else{
      let contentlist = doc
      console.log('_______________')
      console.log(doc)
    }
  }) */

})

module.exports = router;