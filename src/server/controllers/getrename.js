var express = require('express');
var router = express.Router();
const usermodels = require('../models/userModel').userModel;

router.get('/', (req, res) => {
    let account = req.query.userName
    let rename = []
    usermodels.findOne({
        user_account: account
    }, (err, docs) => {
        if (err) {
            console.log('Error:' + err)
            res.send(err)
        } else {

            var user = docs.user_otheruser

            if (user == null) {
                res.send({
                    data: [{
                        "rename": []
                    }, ]
                })
                return false
            }

            
            console.log("________" + user.length);

            for (var i = 0; i < user.length; i++) {
                var accountObj = {
                    "user_account": user[i].user_account
                }
                var renameObj = {
                    "user_rename": user[i].user_rename
                }
                var renameObj = Object.assign(accountObj, renameObj)
                rename.push(renameObj)
            }
            console.log(rename);

            res.send({
                data: [{
                    "rename": rename
                }, ]
            })
        }
    })
})
module.exports = router;