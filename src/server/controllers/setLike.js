var express = require('express');
var router = express.Router();
let usermodels = require('./../models/userModel').userModel

router.get('/', (req, res) => {
    let account = req.query.userName
    let otheraccount = req.query.otherAccount
    let like = req.query.like

    if (like == "1") {
        usermodels.updateOne({
            'user_account': otheraccount
        }, {
            $push: {
                'user_like': account
            }
        }, (err) => {
            if (err) {
                // console.log(err)

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
        console.log('取消心心');
        usermodels.update({
            user_account: otheraccount
        }, {
            $pull: {
                user_like: account
            }
        }, (err) => {
            if (err) {
                // console.log(err)
                res.send({
                    status: "0"
                })
            } else {
                res.send({
                    status: "1"
                })
            }
        })
    }

})
module.exports = router;