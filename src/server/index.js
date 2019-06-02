import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import socketIo from 'socket.io'

import history from 'connect-history-api-fallback'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '../../build/webpack.dev.conf'

import router from './router/index' // 后端路由

const app = express()
let server = require('http').createServer(app);

let io = socketIo(server);

//允许跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// 引入history模式让浏览器进行前端路由页面跳转
app.use(history())

app.use(favicon(path.join(__dirname, './public', 'favicon.ico')))
app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname, './public')))

const compiler = webpack(config)
//webpack 中间件
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, 'views')))
app.get('/', function (req, res) {
  res.sendFile('./views/index.html')
})

router(app) // 引用路由

io.set('log level', 0);
var users = {};
var matching = []

io.on('connection', function (socket) {

  socket.on('privateMessage', function (from, to, msg) {
    if (to in users) {
      users[to].emit(to, {
        mess: msg
      });
    }
  });

  socket.on('joinRoom', function (data) {
    console.log(data.userName + '进入了聊天室')
    socket.join('PublicRoom');
    // 当前房间里的成员
    var arr = Object.keys(users);
    console.log("进入 成员有" + arr);

    if (data.userName in users) {} else {
      var nickname = data.userName;
      users[nickname] = socket;
    }
  });

  socket.on('sendPosition', function (data) {
    socket.broadcast.emit('sendPosition', {
      name: data.userName,
      lag: data.userLag,
      lat: data.userLat
    });
  });

  // var matchingArr = []
  // 接收'match' ， 将发起方和接收方存进 matchingArr

  socket.on('match', function (data) {
    var to = data.to

    // if( to in  matchingArr ){
    //   向自己发送.emit("自己", {
    //        msg: "对方占线中"
    //      });
    // }

    // 聊天室用户列表方法------------------------------------------------
    // 先判断对象是否在 matchingRoom 内，是否是第一个发起者
    // 否 >>> 将请求推送到 对象客户端
    // 是 >>> 就告诉发起者 对象正在忙
    // if( to in MatchingROOMList){
    //    方法1： 向自己发送.emit("自己", {
    //       msg: "对方占线中"
    //     });
    //    方法2： matchEachOther
    //    return false
    // }else{}
    matching.push(data.from)
    for (let user in matching) {
      if (matching[user] == to) {
        socket.emit('matching', {
          status: true
        });


        matching.findIndex(function (value, index) {
          if (data.from == value) {
            console.log('占线查询完，退出占线状态');
            matching.splice(index, 1)
          } else {
            console.log('没有此人，数组为： ' + matching);
          }
        })
        // console.log(matching);
        return false
      }
    }
    // console.log(matching);

    // 第一个发起者
    if (to in users) {
      users[to].emit("match" + to, {
        matchFrom: data.from,
        match: true,
        matchColor: data.matchColor
      });
      // socket.join('matchingRoom');
    }
  })

  socket.on('JoinMatching', function (data) {
    // socket.join('matchingRoom');

    if (data.status == "timeout") {
      console.log('超时退出');
      matching.findIndex(function (value, index) {
        if (data.userName == value) {
          console.log('退出占线数组');
          
          matching.splice(index, 1)
        }
      })
    } else if (data.status == "start") {
      matching.push(data.userName)
    }
  })

  socket.on('matchEachOther', function (data) {
    var to = data.to

    if (to in users) {
      users[to].emit("matchEachOther" + to, {
        matchEachOther: data.matchEachOther
      });
    }

    matching.findIndex(function (value, index) {
      if (data.to == value) {
        matching.splice(index, 1)
      }
    })

    matching.findIndex(function (value, index) {
      if (data.from == value) {
        matching.splice(index, 1)
      }
    })
  })

  socket.on('leaveRoom', function (user) {
    socket.emit('disconnect', user);
  })

  socket.on('disconnect', function (user) {
    if (user != "transport error" && user != "transport close" && user != "ping timeout") {
      console.log(user + "连接断开")
      io.to('PublicRoom').emit('leaveRoom', user);
      socket.leave('PublicRoom');
      eval('delete users.' + user)
    } else {
      console.log('socketIO出错:' + user);
    }
  });
});

const SERVER_PORT = 4000
server.listen(SERVER_PORT, () => {
  console.info(`服务已经启动，监听端口${SERVER_PORT}`)
})

export default app