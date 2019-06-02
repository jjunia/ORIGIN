var express = require('express');
var router = express.Router();
const usermodels = require('../models/userModel').userModel;
router.get('/', (req, res) => {
    let useraccount = req.query.account
    
    usermodels.find({
        user_account: useraccount
    }, (err, doc) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            //  console.log(doc)
            // console.log(req.query.keyword)
            let staff = doc.shift()
            const userName = staff.user_name
            const userBrowse = staff.user_browse
            const userLike = staff.user_like.length
            const content = staff.user_content
            const userItem = staff.user_item
            const userpoint = staff.user_point
                    
            res.send({
                data: [{
                    "userName": userName
                }, {
                    "userBrowse": userBrowse
                }, {
                    "userLike": userLike
                }, {
                    "content": content
                },{
                    "userItem":userItem
                },{
                   "point":userpoint 
                }],
                status: true
            })
        }
    })
})

module.exports = router;