var express = require('express');
var router = express.Router();
let usermodels = require('./../models/userModel').userModel

router.get('/', (req, res) => {
    let account = req.query.userName
    let pt = 15

    usermodels.updateOne({
        'user_account': account
    }, {
        $inc: {
            user_point: pt
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
})
module.exports = router;