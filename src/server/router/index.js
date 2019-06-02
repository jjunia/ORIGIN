module.exports = function (app) {

  app.get('/', function (req, res) {
    res.redirect('/');
  });

  // 页面请求路由
  // 入口 登录注册页面
  app.use('/api/LoginPage/createAccount', require('./../controllers/createAccount')); // 创建账号
  app.use('/api/LoginPage/loginAccount', require('./../controllers/loginAccount')); // 登录 验证

  // 标签详情页
  app.use('/api/uploadMusic', require('./../controllers/uploadMusic')); // 音乐上传
  app.use('/api/uploadPhotoText', require('./../controllers/uploadPhotoText')); // 图文上传
  app.use('/api/uploadText', require('./../controllers/uploadText')); // 文本上传
  //删除内容
  app.use('/api/deleteContent',require('./../controllers/deleteContent'))//删除内容
  //关注标签
  app.use('/api/followItem',require('./../controllers/followItem'))//添加关注

  // 个人主页
  app.use('/api/userPage', require('./../controllers/userPage'));

  // 他人主页
  app.use('/api/otherUserPage', require('./../controllers/otherUserPage'));

  // 我的关注 页
  app.use('/api/followPage', require('./../controllers/followPage'));

  // 我的私人 页
  app.use('/api/privatePage', require('./../controllers/privatePage'));

  // 探索发现 页
  app.use('/api/hotPage', require('./../controllers/hotPage'));

  // 频道详情 页
  app.use('/api/detailItem', require('./../controllers/detailItem'));

  // 音乐搜索请求
  app.use('/api/searchMusic', require('./../controllers/searchMusic'));

  //标签搜索请求
   app.use('/api/searchItem', require('./../controllers/searchItem'));

  // 创建标签
  app.use('/api/createItem', require('./../controllers/createItem'));
  
  // 主页推荐用户
  app.use('/api/userRecommend',require('./../controllers/userRecommend'));
  
  // 匹配获取备注
  app.use('/api/getRename',require('./../controllers/getrename'));

  // 添加备注
  app.use('/api/setOtherName',require('./../controllers/setOtherName'))
  
  // 设置喜欢
  app.use('/api/setLike',require('./../controllers/setLike'))
  
  // 设置积分
    app.use('/api/addIntegral',require('./../controllers/addIntegral'))
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    console.log(err)
    res.send(err.message)
  })

  // error handler
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    console.log(err)
    res.send(err.message)
  })
};