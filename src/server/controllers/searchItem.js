var express = require('express');
var router = express.Router();
const itemmodels = require('../models/itemModel').itemModel;

router.post('/', function (req, res) {
    let findval = new RegExp( req.body.search);
    itemmodels.find({ item_name: findval }, (err, doc) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            let items = doc
            // console.log(items);
            // console.log(doc.shift());
            res.send({
                data: {
                    "items": items
                }
            })
        }
    })
})
module.exports = router;