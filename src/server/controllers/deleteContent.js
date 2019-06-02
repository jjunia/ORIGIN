var express = require('express');
var router = express.Router();
var usermodels = require('./../models/userModel').userModel

router.post('/', (req, res) => {
    console.log(req.body);
    let user = req.body.userName
    let key = req.body.key
    let contentId = req.body.user_content_id
    if (key == "0") {
        console.log('000000');

        usermodels.updateOne({
            "user_account": user
        }, {
            $pull: {
                "user_private": {
                    "_id": contentId
                }
            }
        }, (err) => {
            if (err) {
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
        console.log('111111');

        usermodels.updateOne({
            "user_account": user
        }, {
            $pull: {
                "user_content": {
                    "_id": contentId
                }
            }
        }, (err) => {
            if (err) {
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