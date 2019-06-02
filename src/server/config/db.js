var mongoose = require('mongoose');

// const DB_URL = 'mongodb://localhost/Origin';
// const DB_URL = 'mongodb://172.16.101.63:27017/Origin';
const DB_URL = 'mongodb://192.168.191.1:27017/Origin';

mongoose.connect(DB_URL);
var db = mongoose.connection
db.on('connected', function () {
    console.error('数据库连接成功:' + DB_URL);
});
db.on('error', function (err) {
    console.error('数据库连接异常: ' + err);
});
db.on('disconnected', function () {
    console.error('数据库连接断开' + DB_URL);
})

module.exports = db