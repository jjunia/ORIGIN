var express = require('express');
var router = express.Router();
let usermodels = require('./../models/userModel').userModel
//let itemmodels = require('./../models/itemModel').itemModel
router.get('/', (req, res) => {
    let account = req.query.userName
    let otherAccount = req.query.otherAccount
    let rename = req.query.setOtherName

    let user_otheruser = {
        user_account: otherAccount,
        user_rename: rename
    }
    usermodels.findOne({
        'user_account': account
    }, (err, doc) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            let other = doc.user_otheruser
            let ouser = []
            for (var i in other) {
                ouser.push(other[i].user_account)
            }
            console.log('_______' + ouser)
            if (ouser.indexOf(otherAccount) >= 0) {
                console.log(111111111111)

                usermodels.update({
                    user_account: account
                }, {
                    user_otheruser: {
                        user_account: otherAccount,
                        user_rename: rename
                    }
                }, (err, doc) => {
                    if (err) {
                        console.log(3);

                        console.log(err)
                        res.send(err)
                    } else {
                        console.log('update rename Successfully!')
                        res.send({
                            data: {
                                status: 1
                            }
                        })
                    }
                })
            } else {
                console.log(222222222222)
                usermodels.update({
                    user_account: account
                }, {
                    $push: {
                        user_otheruser: user_otheruser
                    }
                }, (err, doc) => {
                    if (err) {
                        console.log(err)
                        res.send(err)
                    } else {
                        console.log('add successfully!!')
                    }
                })
            }
        }
    })





    /*     usermodels.update({
            user_account: account
        }, {
            $push: {
                user_otheruser: user_otheruser
            }
        }, (err, doc) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                console.log('add successfully!!')
            }
        }) 

        usermodels.update({
            user_account: account
        }, {user_otheruser :{
            user_account: otherAccount,
            user_rename: rename
        }}, (err, doc) => {
            if (err) {
                console.log(3);

                console.log(err)
                res.send(err)
            } else {
                console.log('update rename Successfully!')
                res.send({
                    data: {
                        status: 1
                    }
                })
            }
        })*/
})
module.exports = router;