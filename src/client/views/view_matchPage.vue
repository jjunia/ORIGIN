<template>
  <div id="matchPage">
    <p id="matchPageLogo" v-show="!SHOWcountdown">ORIGIN</p>
    <button class="return" id="return" v-on:click="goback">返回</button>
    <div class="matchBgColor" v-show="matchBgColorShow" :style="{backgroundColor: matchColor}"></div>
    <div class="range" :class="rangeBgColor">
      <div class="coordinate"></div>
    </div>

    <!--  <div id="userList">
      <div v-for="otherUser in otherUsers" :key="otherUser.index">{{otherUser}}</div>
      <br>
      {{ userLag}} - {{ userLat}} 
    </div>-->
    <!-- <div id="userList"> -->
      <!-- {{log}}{{to}} -->
    <!-- </div> -->
    <!-- <div style="position: absolute;zIndex:999">{{countReduce}} - {{ countdown}}</div> -->
    <div class="coordinate_other" v-for="otherUser in otherUsers"
      :style="{marginLeft:  otherUser.x,marginTop:  otherUser.y}" :key="otherUser.index"
      :data-othername="otherUser.name">
      <button :class="beSelected" @click="selected" :disabled="matchBgColorShow"></button>
      <br>
      <div @click="openSmallWin">
        <router-link tag="span" :to="{ name:'toSmallWin',params:{ detailUserId: otherUser.name, smallWin: '1' }}">
          <template v-if="otherUser.rename==''">匿名</template>
          <template v-else-if="otherUser.rename=='none'"></template>
          <template v-else>{{otherUser.rename}}</template>
        </router-link>
      </div>
      <!-- {{otherUser.x}}-{{ otherUser.y}} -->
    </div>

    <div id="mapBox" v-show="mapShow">
      <canvas id="map"></canvas>
    </div>

    <button id="match" :class="btnLike" :disabled="btnLike != 'btnLikeAnimation'" @click="match">MATCH</button>

    <div id="waitting" :class="watting">
      <div class="waittingLeft"></div>
      <div class="waittingRight"></div>
    </div>

    <div id="small_window" v-show="SHOWSmallPage">
      <router-view></router-view>
    </div>

    <div id="countdown" v-show="SHOWcountdown">{{countdown}}</div>

    <p id="waittingTip" :class="watting">自己选的妹子/汉子 就不要后悔了</p>

    <router-link tag="div" to="/chatPage">
      <button class="yesOrno" id="accept" v-show="matchres" @click="accept">
        √
      </button>
    </router-link>
    <button class="yesOrno" id="refuse" v-show="matchres" @click="refuse">×</button>
  </div>
</template>
<script>
  import Vue from "vue";
  import store from "./../store/store.js";
  import otherUserPage from "./view_otherUser.vue";

  export default {
    name: "view_matchPage",
    components: {
      otherUserPage
    },
    data() {
      return {
        otherUsers: [],
        from: "",
        to: "",
        userId: "",
        userLag: 0, // 113.489895
        userLat: 0, // 23.45363
        beSelected: "noSelected",
        btnLike: "nobtnLikeAnimation",
        rangeBgColor: "rangeBgColor",
        watting: "nowatting",
        matchres: false,
        matchColor: "",
        mapShow: true,
        matchBgColorShow: false,
        memberCount: 0,
        matchFrom: "",
        position: null,
        draw: null,
        countReduce: null,
        reNameList: [],
        log: "",
        countdown: 30,
        SHOWcountdown: false
      };
    },
    computed: {
      SHOWSmallPage() {
        return this.$store.state.SHOWSmallPage;
      }
    },
    sockets: {
      connect: function () {
        console.log("连接到聊天室");
      }
    },
    methods: {
      addIntegral: function () {
        let userName = localStorage.getItem("userName");

        let params = {
          userName: userName
        };

        this.$http
          .get("/api/addIntegral", {
            params: params
          })
          .then(res => {
            // 上传成功
            let status = res.data.status;
            if (status == "1") {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "完成匹配，获得15积分");
            } else {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "积分累加失败");
            }
          })
          .catch(reject => {
            console.log(reject);
            store.commit("AlertShow", true);
            store.commit("AlertTip", "出错了");
          });
      },

      connect: function () {},
      goback: function () {
        this.$router.push("/");
      },
      openSmallWin: function () {
        this.$store.commit("SHOWSmallPage", true);
      },
      selected: function (event) {
        let eventClass = event.target.className;
        // console.log(event.srcElement.offsetParent.dataset.othername);
        this.$data.to = event.srcElement.offsetParent.dataset.othername;

        if (eventClass == "noSelected") {
          this.$data.btnLike = "btnLikeAnimation";


          // console.log(event.target.className);

          // this.$data.beSelected = "noSelected";
          // this.$set(this.beSelected, "beSelected", "xx");
          this.$data.beSelected = "xx";

          setTimeout(() => {
            event.target.className = "beSelected";
          }, 80);

          // let dataSet = event.srcElement.offsetParent.dataset.othername;
          // let dataTo = this.$data.to;
          // console.log(dataTo == dataSet);
        } else {
          // this.$set(this.beSelected, "beSelected", "noSelected");
          this.$data.beSelected = "noSelected";
          // alert(2);
          // this.$data.btnLike = "nobtnLikeAnimation";
          // event.target.className = "noSelected";

          setTimeout(() => {
            event.target.className = "beSelected";
          }, 80);

          // let dataSet = event.srcElement.offsetParent.dataset.othername;
          // let dataTo = this.$data.to;
          // console.log(dataTo == dataSet);
        }
      },
      match: function () {
        const _this = this;

        this.$data.btnLike = "btnLikeHidden";
        this.$data.rangeBgColor = "norangeBgColor";
        this.$data.watting = "watting";
        this.$data.mapShow = false;
        this.$data.matchBgColorShow = true;

        let colorR = parseInt(Math.random() * 255);
        let colorG = parseInt(Math.random() * 255);
        let colorB = parseInt(Math.random() * 255);

        let colorRGB = "rgb(" + colorR + "," + colorG + "," + colorB + ")";
        this.$data.matchColor = colorRGB;

        this.$socket.emit("match", {
          from: this.$data.from,
          to: this.$data.to,
          matchColor: this.$data.matchColor
        });

        this.$data.SHOWcountdown = true;
        this.$data.countdown -= 1;

        _this.$data.countReduce = setInterval(function () {
          _this.$data.countdown -= 1;
          if (_this.$data.countdown == 0) {
            store.commit("AlertShow", true);
            store.commit("AlertTip", "match请求超时关闭");

           _this.$data.otherUsers = [];

            _this.$socket.emit("JoinMatching", {
              userName: _this.$data.from,
              status: "timeout"
            });

            clearInterval(_this.$data.countReduce);
            _this.$data.countdown = 30;
            _this.$data.SHOWcountdown = false;

            _this.$data.matchres = false;

            _this.$data.btnLike = "btnLikeAnimation";
            _this.$data.beSelected == "xx";

            _this.$data.rangeBgColor = "rangeBgColor";
            _this.$data.watting = "nowatting";
            _this.$data.mapShow = true;
            _this.$data.matchBgColorShow = false;
          }
        }, 1000);

        let to = this.$data.to;
        // alert(to)
        let otherUsers = this.$data.otherUsers;
        otherUsers.map(function (user, index) {
          if (user.name == to) {} else {
            user.rename = "none";
          }
        });

        localStorage.setItem("chatWith", this.$data.to);
        localStorage.setItem("matchColor", colorRGB);
      },
      accept: function () {
        const _this = this;

        this.$socket.emit("matchEachOther", {
          from: this.$data.from,
          to: this.$data.matchFrom,
          matchEachOther: true
        });
        this.$store.commit("SHOWSmallPage", true);
        clearInterval(_this.$data.countReduce);

        _this.$data.countdown = 30;
        _this.$data.SHOWcountdown = false;

        _this.$data.matchres = false;

        _this.$data.btnLike = "btnLikeAnimation";
        _this.$data.beSelected == "xx";

        _this.$data.rangeBgColor = "rangeBgColor";
        _this.$data.watting = "nowatting";
        _this.$data.mapShow = true;
        _this.$data.matchBgColorShow = false;
        _this.$data.SHOWcountdown = false;



        localStorage.setItem("chatWith", this.$data.matchFrom);
        // this.$router.push({ path:"/chatPage"});

      },
      refuse: function () {
        const _this = this;
        this.$socket.emit("matchEachOther", {
          from: this.$data.from,
          to: this.$data.matchFrom,
          matchEachOther: false
        });

        this.$data.matchres = false;
        this.$data.btnLike = "noLikeAnimation";
        this.$data.rangeBgColor = "rangeBgColor";
        this.$data.watting = "nowatting";
        this.$data.mapShow = true;
        this.$data.matchBgColorShow = false;

        clearInterval(_this.$data.countReduce);
        this.$data.SHOWcountdown = false;
        this.countdown = 30;


        this.otherUsers = [];
      },
      getReName: function () {
        let userName = localStorage.getItem("userName");
        let params = {
          userName: userName
        };

        this.$http
          .get("/api/getRename", {
            params: params
          })
          .then(response => {
            // console.log(response.data);

            let res = response.data.data.shift().rename;
            // console.log(res);
            this.reNameList = res;
          })
          .catch(reject => {
            store.commit("AlertShow", true);
            store.commit("AlertTip", "获取rename失败");
          });
      }
    },
    created() {
      this.$store.commit("SHOWFooter", false);
      this.getReName();
    },
    mounted() {
      const _this = this;

      var userName = this.$store.state.userName;
      this.$data.from = userName;

      this.$socket.emit("joinRoom", {
        userName: userName
      });

      // ------------------------ socketIO 监听事件------------------------

      // 用户离开地图
      this.$socket.on("leaveRoom", function (leaveUser) {
        let otherUsers = _this.$data.otherUsers;
        // console.log(leaveUser + "走人了");

        for (let i = 0; i < otherUsers.length; i++) {
          if (otherUsers[i].name == leaveUser) {
            otherUsers.splice(i, 1);
            _this.$data.memberCount -= 1;
          }
        }
      });

      let aaa = this.$data.otherUsers;
      let f = {
        name: "dd",
        rename: "",
        lag: "",
        lat: "",
        x: "40px",
        y: "-40px"
      };
      aaa.splice(this.memberCount, 0, f);
      this.memberCount += 1

      let s = {
        name: "cc",
        rename: "",
        lag: "",
        lat: "",
        x: "-50px",
        y: "50px"
      };
      aaa.splice(this.memberCount, 0, s);
       this.memberCount += 1

      let t = {
        name: "d",
        rename: "小哥哥",
        lag: "",
        lat: "",
        x: "10px",
        y: "10px"
      };

      aaa.splice(this.memberCount, 0, t);



      let p = {
        name: "p",
        rename: "",
        lag: "",
        lat: "",
        x: "-70px",
        y: "-140px"
      };

      aaa.splice(this.memberCount, 0, p);

      // 监听所有人位置信息变化 !
      this.$socket.on("sendPosition", function (data) {
        let otherUsers = _this.$data.otherUsers;
        let renameList = _this.$data.reNameList;

        if (_this.$data.userLag == 0) {
          // store.commit("AlertShow", true);
          // store.commit("AlertTip", "无法定位");
          otherUsers = [];
          return false;
        }

        // 判断是否在获取范围内

        let myPosLag = _this.$data.userLag;
        let myPosLat = _this.$data.userLat;

        let otherPosLag = data.lag;
        let otherPosLat = data.lat;

        // lag = 0.000335423
        // lat = 0.00027863

        let Dvalue_lag = Math.abs(myPosLag - otherPosLag);
        let Dvalue_lat = Math.abs(myPosLat - otherPosLat);

        if (Dvalue_lag > 0.000335423) {
          //0.0001118077
          // return false;
        } else if (Dvalue_lat > 0.00027863) {
          // 0.0000928767
          // return false;
        } else {
          if (otherUsers.length == 0) {
            // 如果用户数组为空
            let userLag = _this.$data.userLag;
            let userLat = _this.$data.userLat;
            let otherLag = data.lag;
            let otherLat = data.lat;
            let x = 0;
            let y = 0;
            let otherX;
            let otherY;

            if (otherLag > userLag) {
              x = (otherLag - userLag) / 0.0000030493;
              otherX = x + "px";
            } else {
              if (otherLag == 0) {
                otherX = "0px";
              } else {
                x = (userLag - otherLag) / 0.0000030493;
                otherX = "-" + x + "px";
              }
            }

            if (otherLat > userLat) {
              y = (otherLat - userLat) / 0.000002533;
              otherY = y + "px";
            } else {
              if (otherLat == 0) {
                otherY = "0px";
              } else {
                y = (userLat - otherLat) / 0.000002533;
                otherY = "-" + y + "px";
              }
            }

            let firstOther = {
              name: data.name,
              rename: "",
              lag: data.lag,
              lat: data.lat,
              x: otherX,
              y: otherY
            };

            renameList.map(function (rename, index) {
              if (firstOther.name == rename.user_account) {
                firstOther.rename = rename.user_rename;
              }
            });

            otherUsers.splice(0, 0, firstOther);
          } else {
            // 如果用户数组不为空
            var exsit = false; // 记录遍历是否查找到用户存在

            // 遍历现今用户数组 查看用户名是否存在
            otherUsers.map(function (other, index) {
              if (other.name == data.name) {
                // 如果用户名已存在

                // 则将位置信息转换为地图坐标
                let userLag = _this.$data.userLag;
                let userLat = _this.$data.userLat;
                let otherLag = other.lag;
                let otherLat = other.lat;
                let x = 0;
                let y = 0;

                let otherX;
                let otherY;

                if (otherLag > userLag) {
                  x = (otherLag - userLag) / 0.0000030493;
                  otherX = x + "px";
                } else {
                  if (otherLag == 0) {
                    otherX = "0px";
                  } else {
                    x = (userLag - otherLag) / 0.0000030493;
                    otherX = "-" + x + "px";
                  }
                }

                if (otherLat > userLat) {
                  y = (otherLat - userLat) / 0.000002533;
                  otherY = y + "px";
                } else {
                  if (otherLat == 0) {
                    otherY = "0px";
                  } else {
                    y = (userLat - otherLat) / 0.000002533;
                    otherY = "-" + y + "px";
                  }
                }

                // let rename
                // if(){
                //   rename = other.rename
                // }else{

                // }

                let userExist = {
                  name: other.name,
                  rename: other.rename,
                  lag: other.lag,
                  lat: other.lat,
                  x: otherX,
                  y: otherY
                };
                _this.$data.log = userExist;
                // 替换原来的信息
                otherUsers.splice(index, 1, userExist);
                // otherUsers.push(userExist);
                exsit = true; // 查找成功 返回true给外部
              }
            });

            if (exsit === true) {
              // 用户存在且替换位置信息成功 程序结束
              return false;
            }
            // 用户不存在则新增
            // console.log("名字不存在");
            // otherUsers.push(data);
            let userLag = _this.$data.userLag;
            let userLat = _this.$data.userLat;
            let otherLag = data.lag;
            let otherLat = data.lat;
            let x = 0;
            let y = 0;
            let otherX;
            let otherY;

            if (otherLag > userLag) {
              x = (otherLag - userLag) / 0.0000030493;
              otherX = x + "px";
            } else {
              if (otherLag == 0) {
                otherX = "0px";
              } else {
                x = (userLag - otherLag) / 0.0000030493;
                otherX = "-" + x + "px";
              }
            }

            if (otherLat > userLat) {
              y = (otherLat - userLat) / 0.000002533;
              otherY = y + "px";
            } else {
              if (otherLat == 0) {
                otherY = "0px";
              } else {
                y = (userLat - otherLat) / 0.000002533;
                otherY = "-" + y + "px";
              }
            }

            let firstOther = {
              name: data.name,
              rename: "",
              lag: data.lag,
              lat: data.lat,
              x: otherX,
              y: otherY
            };

            renameList.map(function (rename, index) {
              if (firstOther.name == rename.user_account) {
                firstOther.rename = rename.user_rename;
              }
            });

            otherUsers.splice(0, 0, firstOther);
            _this.$data.memberCount += 1;
          }
        }
      });

      // 别人对自己的match请求
      this.$socket.on("match" + userName, function (data) {
        // = data.matchFrom
        let matchFrom = data.matchFrom;
        _this.$data.log = matchFrom;

        _this.$socket.emit("JoinMatching", {
          userName: userName,
          status: "start"
        });

        _this.$data.SHOWcountdown = true;
        _this.$data.countdown -= 1;
        _this.$data.countReduce = setInterval(function () {
          _this.$data.countdown -= 1;
          if (_this.$data.countdown <= 20) {
            // alert("<20")
            _this.refuse();
          }
        }, 1000);

        let otherUsers = _this.$data.otherUsers;
        otherUsers.map(function (user, index) {
          if (user.name == matchFrom) {} else {
            user.rename = "none";
          }
        });

        if (data.match === true) {
          _this.$data.matchres = true;
          _this.$data.btnLike = "btnLikeHidden";
          _this.$data.matchFrom = data.matchFrom;

          // 接收到match请求时隐藏地图所有部件
          _this.$data.rangeBgColor = "norangeBgColor";
          _this.$data.watting = "nowatting";
          _this.$data.mapShow = false;
          _this.$data.matchBgColorShow = true;
          _this.$data.matchColor = data.matchColor;

          localStorage.setItem("matchColor", data.matchColor);
        }
      });
      // 对方是否在占线状态
      this.$socket.on("matching", function (data) {
        // alert(data.status);
        if (data.status === true) {
          store.commit("AlertShow", true);
          store.commit("AlertTip", "对方占线中");

          clearInterval(_this.$data.countReduce);
          _this.$data.countdown = 30;
          _this.$data.SHOWcountdown = false;

          _this.$data.matchres = false;

          _this.$data.btnLike = "btnLikeAnimation";
          _this.$data.beSelected == "xx";

          _this.$data.rangeBgColor = "rangeBgColor";
          _this.$data.watting = "nowatting";
          _this.$data.mapShow = true;
          _this.$data.matchBgColorShow = false;
        }
      });

      // 自己对别人发起match请求的结果
      this.$socket.on("matchEachOther" + userName, function (data) {
        // alert("对方说"+ data.matchEachOther)


        clearInterval(_this.$data.countReduce);
        _this.$data.countdown = 30;
        _this.$data.SHOWcountdown = false;

        _this.$data.matchres = false;

        _this.$data.btnLike = "btnLikeAnimation";
        _this.$data.beSelected == "xx";

        _this.$data.rangeBgColor = "rangeBgColor";
        _this.$data.watting = "nowatting";
        _this.$data.mapShow = true;
        _this.$data.matchBgColorShow = false;
         _this.$data.otherUsers = [];

        if (data.matchEachOther === true) {
          // 对方接受match请求
          // clearInterval(_this.$data.countReduce);
          _this.$router.push({
            path: "/chatPage",
          });
          // _this.$data.SHOWSmallPage = true
          // _this.$data.countdown = 30;
          // _this.$data.SHOWcountdown = false;
          _this.$store.commit("SHOWSmallPage", true);
        } else {
          store.commit("AlertShow", true);
          store.commit("AlertTip", "match请求被拒绝");

        }
      });

      // 定位
      function showError(error) {
        // 定位错误信息
        switch (error.code) {
          case error.PERMISSION_DENIED:
            store.commit("AlertShow", true);
            store.commit("AlertTip", "定位失败,用户拒绝请求地理定位");
            // otherUsers = [];
            break;
          case error.POSITION_UNAVAILABLE:
            store.commit("AlertShow", true);
            store.commit("AlertTip", "定位失败,位置信息是不可用");
            // otherUsers = [];
            break;
          case error.TIMEOUT:
            store.commit("AlertShow", true);
            store.commit("AlertTip", "定位失败,请求获取用户位置超时");
            // otherUsers = [];
            break;
          case error.UNKNOWN_ERROR:
            store.commit("AlertShow", true);
            store.commit("AlertTip", "定位失败,定位系统失效");
            // otherUsers = [];
            break;
        }
      }
      var options = {
        enableHighAccuracy: true, // 开启精准模式
        timeout: 5000,
        maximumAge: 0
      };
      // 新中心点(23.4571450000,113.5018010000)
      // 中心点(23.45363 N, 113.489895 S),

      function showPositions(position) {
        // 获取经纬度信息
        _this.$data.userLat = position.coords.latitude - 0.000029; // 纬度+ 0.0066173894
        _this.$data.userLag = position.coords.longitude + 0.00105; //  -0.0039320616499  经度- 0.0049920716499

        var sendLat = _this.$data.userLat;
        var sendLag = _this.$data.userLag;

        var newLat = Number(sendLat);
        var newLag = Number(sendLag);
        _this.$socket.emit("sendPosition", {
          userName: userName,
          userLat: newLat,
          userLag: newLag
        });
      }

      var watchID;

      function getLocation() {
        // 获取位置信息

        if (navigator.geolocation) {
          watchID = navigator.geolocation.watchPosition(
            showPositions,
            showError,
            options
          );
        } else {
          alert("浏览器不支持地理定位");
        }
      }
      getLocation();

      // 获取设备高度
      var u = navigator.userAgent || navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; // android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      var devHeight; // 设备高度
      if (isiOS) {
        devHeight = window.screen.availHeight - 40; // 顶部状态栏高度
      }
      if (isAndroid) {
        devHeight = window.screen.availHeight - 10;
      }

      var DOMmap = document.getElementById("map"); // 获取canvas
      var map = DOMmap.getContext("2d"); // canvas

      var MapImg = new Image();
      MapImg.src = "./map3.png";

      var devWidth = window.screen.availWidth; // 设备宽度
      // var devWidth = wind; // 设备宽度

      var bgMapX = 1300 - devWidth / 2; // 默认定位为地图中心点 截取背景图长的一半 - 设备的宽度值的一半
      var bgMapY = 1094.5 - devHeight / 2; // 默认定位为地图中心点 截取背景图高的一半 - 设备的高度值的一半
      var mapMultiple = 3; // 放大四倍

      console.log(devWidth + ":" + devHeight);

      var latAlpha = bgMapY / 23.4536119682; // 纬度转换背景图截取高度 固定换算值
      var lagAlpha = bgMapX / 113.4899751774; // 经度转换背景图截取长度 固定换算值

      var latAlpha2 = 0.00277316 / 1094.5; // 纬度转换背景图截取高度 固定换算值
      var lagAlpha2 = 0.00396406 / 1300; // 经度转换背景图截取长度 固定换算值

      var X; // 横向坐标 经度跨度
      var Y; // 纵向坐标 纬度跨度

      this.$data.draw = setInterval(function () {
        map.clearRect(0, 0, DOMmap.width, DOMmap.height);
        var latVal = _this.$data.userLat; // 获取的纬度
        var lagVal = _this.$data.userLag; // 获取的经度

        if (latVal == 0 && lagVal == 0) {
          X = 113.4899751774 * lagAlpha;
          Y = 23.4536119682 * latAlpha;
          // alert(X + ":" + Y);
        } else {
          X = 1112.5 + (lagVal - 113.4899751774) / lagAlpha2; // 1120
          Y = 780.9 - (latVal - 23.4536119682) / latAlpha2;
        }
        //  alert(X + ":" + Y);
        map.drawImage(MapImg, X, Y, 2600 * 1.9, 2189 * 1.9, 0, 0, 2600, 2189);
      }, 4000);
      MapImg.onload = this.$data.draw;

      document.getElementById("return").addEventListener("click", function () {
        // clearInterval(draw)
        // clearInterval(position)
        navigator.geolocation.clearWatch(watchID);
      });
    },
    beforeDestroy() {
      /* clearInterval(draw)
                  clearInterval(position)
                  navigator.geolocation.clearWatch(watchID); */
      clearInterval(this.position);
      clearInterval(this.draw);
      let userName = localStorage.getItem("userName");
      this.$socket.emit("leaveRoom", userName);
    }
  };
</script>
<style>
  @import "./../assets/css/view_matchPage.css";
</style>