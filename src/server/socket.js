import socketIo from 'socket.io'


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

    if (data.userName in users) {
    } else {
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
for(let user in matching){
  if(matching[user] == to){
    socket.emit('matching', {
      status: true
    });
    return false
  }
}
console.log(matching);

    // 第一个发起者
    if (to in users) {
      users[to].emit("match" + to, {
        matchFrom: data.from,
        match: true,
        matchColor: data.matchColor
      });
      // socket.join('matchingRoom');
      matching.push(data.from)
    }
  })

  socket.on('JoinMatching', function (data) {
    // socket.join('matchingRoom');
    matching.push(data.userName)
    console.log(matching);
    
  })

  socket.on('matchEachOther', function (data) {
    var to = data.to

    if (to in users) {
      users[to].emit("matchEachOther" + to, {
        matchEachOther: data.matchEachOther
      });
    }
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
    }
    else {
      console.log('socketIO出错:' + user);
    }
  });
});