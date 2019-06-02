var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
const usermodels = require('../models/userModel').userModel;

router.get('/', (req, res) => {
   let account = req.query.userName
   // console.log(account);
   // console.log(Math.random());

   usermodels.find({}, (err, docs) => {
      if (err) {
         console.log('Error:' + err)
         res.send(err)
      } else {
         var user = []
         for (var i = user.length; i < 4; i++) {
            var l = docs.length
            // console.log("LLLLLL" + l);
            var j = Math.floor(Math.random() * l)
            // console.log("JJJJJJJ" + j);
            if (docs[j].user_account != undefined && docs[j].user_account != account&&
               user.indexOf(docs[j].user_account)==-1) {
               user.push(docs[j].user_account)
            }else{
               i--
            }
         }
         console.log("USER"+user);         
         res.send(user)
      }
   })
   /*    let account = req.body.user_account
      let item_name = 'Music'
      let newitem = {
         //  user_id:req.body.user_id,
         item_id: itemid, //先初始化一个值，再通过匹配关联表id
         item_jurisdiction: req.body.item_jurisdiction,
         user_content_content: req.body.item_content,
         user_content_date: req.body.item_time
      }
      itemmodels.find({
         item_name: item_name
      }, (err, doc) => {
         if (err) {
            console.log(err)
            res.send(err)
         } else {
            // console.log(doc)  
            newitem.item_id = doc.shif().item_id
            // var newbrowse = doc.item_browse+1     
            usermodels.update({
               user_account: account
            }, {
               $push: {
                  user_content: newitem
               }
            }, (err, doc) => {
               if (err) {
                  console.log(err)
                  res.send(err)
               } else {
                  res.send({
                     data: [{
                        msg: 'inssue successfully'
                     }]
                  })
                  itemmodels.update({
                     item_name: item_name
                  }, {
                     $inc: {
                        item_browse: 1
                     }
                  }, (err, doc) => {
                     if (err) {
                        console.log(err)
                        res.send(err)
                     } else {
                        usermodels.findOneAndUpdate(  {
                           user_account: account
                        }, {
                           $addToset: {
                              user_item: newitem.item_id
                           }
                        }, (err, doc) => {
                           if(err){
                              console.log(err)
                           }
                        })
                     }
                  })
               }
            })
   
         }
      }) */
})
module.exports = router;