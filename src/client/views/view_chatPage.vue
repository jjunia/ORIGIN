<template>
  <div class="view_chatPage" :style="{backgroundColor: matchColor}">

    <!-- <div id="shadeTop" :style="{backgroundColor: matchColor}"></div>
    <div id="shadeBottom" :style="{backgroundColor: matchColor}"></div> -->

    <button class="chatReturn" @click="goback">退出</button>
    <p id="chatTip">每个人最多只能向对方发三段话，尽量在三段话内告诉对方自己的位置，以及其他能够让对方识别出自己的信息</p>
    <div id="chat_container">
      <div class="chatCard_other" v-for="otherMessage in otherMessages" :key="otherMessage.index"
        :class="otherCount==3?'stopChat':''">
        <p class="chatContent_other" v-if="otherMessage" :class="selfCount==3?'stopChatP':''">
          {{ otherMessage }}
        </p>
      </div>
      <div class="chatCard_self" v-for="selfMessage in selfMessages" :key="selfMessage.index"
        :class="selfCount==3?'stopChat':''">
        <p class="chatContent_self" v-if="selfMessage" :class="selfCount==3?'stopChatP':''">
          {{ selfMessage }}
        </p>
      </div>

      <p class="endTip" v-show="selfCount==3">赶紧找到妹子/汉子，在现实中说上几句话吧</p>
    </div>

    <div id="SHOWconfirm" v-show="SHOWconfirm">
      <p>该操作无法返回，你确认要退出吗？</p>
      <button @click="confirmT">确认</button>
      <button @click="confirmF">取消</button>
    </div>

    <div id="chatBox" v-show="SHOWchatBox">
      <input id="chatInput" type="text" placeholder="输入打招呼内容..." v-on:focus="onFocus" v-on:blur='onBlur' v-model="msg"
        autocomplete="off">
      <button type="button" id="chatSend" @click="sendMessage()">发送</button>
    </div>



  </div>
</template>
<script>
  import Vue from "vue";
  import store from './../store/store.js'

  export default {
    name: "view_chatPage",
    // inject:['reload'],
    data() {
      return {
        otherMessages: [],
        selfMessages: [],
        selfCount: 0,
        otherCount: 0,
        matchColor: "",
        from: '',
        to: '',
        msg: '',
        SHOWconfirm: false,
        SHOWchatBox: true
      };
    },
    computed: {
      SHOWSmallPage() {
        return this.$store.state.SHOWSmallPage;
      },

    },
    sockets: {
      connect: function () {
        console.log('进入私聊聊天室')
      }
    },
    methods: {
      goback: function () {
        this.$data.SHOWconfirm = true
      },
      confirmT: function () {
        this.$socket.emit('privateMessage', this.$data.from, this.$data.chatWith, "*#$userOut$#*");
        // this.$router.go(-1);
        this.$data.SHOWconfirm = false
        this.$store.commit("SHOWSmallPage", false);

      },
      confirmF: function () {
        this.$data.SHOWconfirm = false
      },
      onFocus: function () {
        setTimeout(function () {
          // 设置body的高度为可视高度+302
          // 302为原生键盘的高度
          document.getElementsByTagName("body")[0].style.height =
            window.innerHeight + 302 + "px";
          // document.body.scrollTop = 302;
        }, 300);
      },
      onBlur: function () {
        document.getElementsByTagName("body")[0].style.height =
          window.innerHeight + "px";
      },
      sendMessage: function (event) {
        if (this.$data.msg == "" || this.$data.msg == undefined) {
          store.commit("AlertShow", true);
          store.commit("AlertTip", "你输入的是空消息");
        } else {
          this.$socket.emit('privateMessage', this.$data.from, this.$data.chatWith, this.$data.msg);

          /*   因为vue实现双向数据绑定的机制是数据劫持
              也就是在所有对象上有个Object.defineProperty()方法
              通过监听set，get方法去实现
              而数组没有这两个方法，所以就不会更新view
              解决方案就是，需要我们主动通知vue */
          this.$set(this.selfMessages, this.selfCount, this.msg);
          this.$data.selfCount += 1
          this.$data.msg = ""

          if (this.$data.selfCount == 3) {
            this.$data.SHOWchatBox = false
          }
        }
      },
      addIntegral: function () {
        let userName = localStorage.getItem("userName")

        let params = {
          userName: userName,
        };

        this.$http
          .get("/api/addIntegral", {
            params: params
          })
          .then(res => {
            // 上传成功
            let status = res.data.status
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
      }
    },
    created() {
      this.$store.commit('SHOWFooter', false)
    },
    mounted() {
      this.addIntegral()


      this.$data.otherMessages = []
      this.$data.selfMessages = []
      this.$data.selfCount = 0
      this.$data.otherCount = 0
      this.$data.matchColor = ""
      this.$data.from = ''
      this.$data.to = ''
      this.$data.msg = ''
      this.$data.SHOWconfirm = false
      this.$data.SHOWchatBox = true


      this.$data.matchColor = localStorage.getItem("matchColor")
      this.$data.chatWith = localStorage.getItem("chatWith")

      var userName = localStorage.getItem('userName')
      this.$data.from = userName

      this.$socket.emit("joinPrRoom", {
        userName: userName
      });

      var _this = this;
      this.$socket.on(userName, function (data) {

        if (data.mess == "*#$userOut$#*") {
          store.commit("AlertShow", true);
          store.commit("AlertTip", "对方退出了match");


          _this.$data.SHOWconfirm = false
          _this.$store.commit("SHOWSmallPage", false);

        } else {
          _this.$set(_this.otherMessages, _this.otherCount, data.mess);
          _this.$data.otherCount += 1
        }

      });


      // 输入框
      function chatBoxFocus() {
        // document.querySelector('#chatBox').scrollIntoView()
        // chatContainer.style.height = '40%'
        setTimeout(function () {
          document.body.scrollTop = (document.body.scrollHeight + 200)
        }, 1000)
      }

      function chatBoxBlur() {
        document.querySelector('#chatBox').scrollIntoView()
        // chatContainer.style.height = '100%'
      }
      // document.getElementById('chatInput').addEventListener('focus', chatBoxFocus, false)
      // document.getElementById('chatInput').addEventListener('blur', chatBoxBlur, false)
    },
    watch: {
      SHOWSmallPage(val) {
        // console.log(val)
        if (val == true) {
          this.$data.otherMessages = []
          this.$data.selfMessages = []
          this.$data.selfCount = 0
          this.$data.otherCount = 0
          this.$data.to = ''
          this.$data.msg = ''
          this.$data.SHOWconfirm = false
          this.$data.SHOWchatBox = true

          this.$data.matchColor = localStorage.getItem("matchColor")
          this.$data.chatWith = localStorage.getItem("chatWith")

        }
      }
    },
    beforeDestroy() {
      this.$socket.emit("leaveRoom", this.$data.from);
    }
  };
</script>
<style>
  @import './../assets/css/view_chatPage.css';
</style>