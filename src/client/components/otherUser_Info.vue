<template>
  <div id="other_userInfo" :class="SmallWin">
    <div id="other_userInfo_left">
      <svg xmlns="http://www.w3.org/2000/svg" @click="other_likeIt" :class="likeIt" id="like_icon"
        viewBox="0 0 512 512">
        <path
          d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">
        </path>
      </svg>
      <!-- <slot name="userLike"></slot> -->
      <div v-show="newLike == 0">{{userLike}}</div>
      <div v-show="newLike != 0">{{newLike}}</div>
    </div>
    <div id="other_userInfo_right">
      <!-- <img id="user_head" src="./../assets/head.png"> -->
      <div id="user_name">
        <!-- <slot name="userName">服务器开小差了不给你数据</slot> -->

        <div v-show="newName =='' ">{{rename}}</div>
        <div v-show="newName !='' ">{{newName}}</div>

        <div @click="setOtherName" v-show="ReName == false" class="setOtherName">
          <svg class="icon_setOtherName" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M400 480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zM238.1 177.9L102.4 313.6l-6.3 57.1c-.8 7.6 5.6 14.1 13.3 13.3l57.1-6.3L302.2 242c2.3-2.3 2.3-6.1 0-8.5L246.7 178c-2.5-2.4-6.3-2.4-8.6-.1zM345 165.1L314.9 135c-9.4-9.4-24.6-9.4-33.9 0l-23.1 23.1c-2.3 2.3-2.3 6.1 0 8.5l55.5 55.5c2.3 2.3 6.1 2.3 8.5 0L345 199c9.3-9.3 9.3-24.5 0-33.9z">
            </path>
          </svg>
        </div>

        <div class="setName">
          <input v-show="ReName" v-model="newName" type="text">
          <div class="ButtonSetName" @click="setName" v-show="ReName">
            <svg class="icon_setName" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z">
              </path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "other_userInfo",
    props: ["otherName", "rename", "likeList", "userLike", "isWin"],
    data() {
      return {
        likeIt: "other_disLike",
        ReName: false,
        newName: "",
        List: this.likeList,
        newLike: 0,
        SmallWin: ""
      };
    },
    methods: {
      other_likeIt: function () {
        if (this.$data.likeIt == "other_yesLike") {
          let params = {
            userName: this.$data.userName,
            otherAccount: this.otherName,
            like: "0"
          };

          this.$http
            .get("/api/setLike", {
              params: params
            })
            .then(response => {
              if (response.data.status == "1") {
                this.$data.likeIt = "other_disLike";

                let likeCount = this.userLike;
                let Count = parseInt(likeCount) - parseInt(1);

                this.newLike = Count;
              } else {
                return false
              }
            })
            .catch(reject => {
              console.log(reject);
              alert("失败");
            });
        } else {
          let params = {
            userName: this.$data.userName,
            otherAccount: this.otherName,
            like: "1"
          };

          this.$http
            .get("/api/setLike", {
              params: params
            })
            .then(response => {
              if (response.data.status == "1") {
                this.$data.likeIt = "other_yesLike";

                let likeCount = this.userLike;
                // console.log(likeCount + "sss");
                let Count = parseInt(likeCount) + parseInt(1);
                // console.log(Count);
                this.newLike = Count;
              } else {
                return false
              }
            })
            .catch(reject => {
              console.log(reject);
              alert("失败");
            });
        }
      },
      setOtherName: function () {
        this.$data.ReName = true;
      },
      setName: function () {
        this.$data.ReName = false;

        let params = {
          userName: this.$data.userName,
          otherAccount: this.otherName,
          setOtherName: this.newName
        };

        console.log(params);

        this.$http
          .get("/api/setOtherName", {
            params: params
          })
          .then(response => {
            if (response.data.status == 1) {
              alert("成功");
            } else {
              console.log(response.data);
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      }
    },
    created() {
      var userName = localStorage.getItem("userName");
      this.$data.userName = userName;
    },
    mounted() {
      // this.$data.newName = this.rename;
      // console.log(this.rename);
      if (this.isWin == true) {
        this.SmallWin = 'SmallWin'
      }

    },
    watch: {
      likeList(val) {
        let List = this.likeList;
        let user = this.$data.userName;


        console.log(List);

        let Exist = List.includes(user);
        // console.log(Exist);

        if (Exist == true) {
          this.$data.likeIt = "other_yesLike";
        } else {
          this.$data.likeIt = "other_disLike";
        }
      }
    }
  };
</script>
<style scope>
  #other_userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 70px;
    padding-bottom: 25px;
    color: #fff;
    background-color: #409eff;
  }

  .SmallWin {
    max-height: 38px
  }

  #user_head {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }

  #user_name {
    font-style: italic;
    font-weight: bold;
    font-size: 25px;
  }

  #other_userInfo_right {
    text-align: center;
    flex: 3;
  }

  .setOtherName {
    margin-top: 2px;
  }

  .icon_setOtherName {
    width: 28px;
    height: 28px;
    fill: #fff;
  }

  .setName {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
  }

  .setName input {
    width: 80%;
    height: 22px;
    padding: 4px;
    outline: none;
    border: 1px solid #fff;
    color: #474747;
  }

  .icon_setName {
    width: 28px;
    height: 28px;
    fill: rgb(157, 252, 155);
  }

  .ButtonSetName {
    width: 20%;
    height: 28px;
  }

  #other_userInfo_left {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #like_icon {
    width: 40px;
    height: 40px;
    margin: 0;
    margin: 10px;
  }

  .other_disLike {
    fill: #cccccc;
    animation: other_dislike 0.7s ease;
  }

  .other_yesLike {
    fill: #e67070;
    animation: other_like 0.65s ease-in-out;
  }

  #other_userInfo_left p span {
    font-size: 3.2em;
  }

  @keyframes other_like {
    0% {
      transform: scale(1);
    }

    25% {
      transform: scale(1.3);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes other_dislike {
    form {
      transform: rotateY(0deg);
    }

    to {
      transform: rotateY(-180deg);
    }
  }
</style>