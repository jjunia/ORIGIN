var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({
    _id: String,
    user: Number,
    user_account: String,
    user_password: String,
    user_point:{type:Number,default:0},
    user_name:{type:String,default:''},
    user_browse: {type: Number,default: 0},
    user_item:[],
    user_like:[],
    user_followItem: [],
    user_otheruser:[{
        user_account:String,
        user_rename:String,
    }],
    user_content:[{
        user_item_id:String,
        user_item_name:String,
        user_content_content:String,
        user_content_uploadType:String,
        user_content_musicImg:String,
        user_content_musicname:String,
        user_content_musicSinger:String,
        user_content_musicPlayUrl:String,
        user_content_photoUrl:String,
        user_content_like:{type:Number,default:0},
        user_content_date:{type:String,default:Date.now()}
    }],
    user_private:[{
        user_content_content:String,
        user_content_uploadType:String,
        user_content_musicImg:String,
        user_content_musicname:String,
        user_content_musicSinger:String,
        user_content_musicPlayUrl:String,
        user_content_photoUrl:String,
        user_content_date:{type:String,default:Date.now()}
    }]
}, {versionKey: false});



userSchema.pre('save', function (next) {
    let doc = this;
    userModel.findByIdAndUpdate({
        _id: "user"
    }, {
        $inc: {
            user: 1
        }
    }, {
        new: true,
        upsert: true
    }, function (error, userSchema) {
        if (error)
            return next(error);
        doc._id = "user" + userSchema.user;

        next();
    });
});

var userModel = mongoose.model('userModel', userSchema)

module.exports = {
    userModel,
}