const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const db = require('./../config/db')

const itemSchema = new mongoose.Schema({
    _id: String,
    it: Number,
    item_name: String,
    item_type:String,
    creator:String,
    item_browse:{type:Number,default:0},
    item_author: [],
    //item_jurisdiction:{type:Boolean,default:true},  。。待考虑，若先有用户创建为私密，岂不是后者不能创建同名的标签作为公开标签
}, {
    versionKey: false
});

/* itemSchema.static = {
    findUserNameByUserId:function(user_id,callback){
        return this
                  .findOne({_id:content_id}).populate('user_id')
                  .exec(callback)
    }
} */

itemSchema.pre('save', function (next) {
    let doc = this;
    itemModel.findByIdAndUpdate({
        _id: "item"
    }, {
        $inc: {
            it: 1
        }
    }, {
        new: true,
        upsert: true
    }, function (error, itemSchema) {
        if (error)
            return next(error);
        doc._id = "item" + itemSchema.it;
        next();
    });
});

const itemModel = mongoose.model('itemModel', itemSchema)

module.exports = {
    itemModel,
}