var express = require('express');
var router = express.Router();
let usermodels = require('./../models/userModel').userModel
let itemmodels = require('./../models/itemModel').itemModel
router.post('/', (req, res) => {
    let account = req.body.userName
    let pt = -60 /* req.body.point */
    let newitem = new itemmodels({
        _id: 'item',
        creator: req.body.userName,
        item_name: req.body.newItemName
    })
    itemmodels.count({
        'item_name': newitem.item_name
    }, (err, doc) => {
        if (err) {
            console.log('Error:' + err)
            res.send({
                status: '0'
            })
        } else {
            if (doc >= 1) {
                res.send({
                    status: '-1'
                })
            } else {
                usermodels.updateOne({
                    user_account: account
                }, {
                    $inc: {
                        user_point: pt
                    }
                }).exec(
                    newitem.save(function (err, doc) {
                        if (err) {
                            console.log('Error:' + err);
                            res.send({
                                status: '0'
                            })
                        } else(
                            console.log('Item Create Successfully!'),
                            res.send({
                                status: '1'
                            })
                        )
                    })
                )
            }
        }
    })
})
module.exports = router;