<template>
  <div id="userCreatePage">
    <div class="upload_title">
      <!-- <div class="upload_type" v-show="selecting == false">发布
        <slot name="itemType">标签类型</slot>
      </div> -->

      <div class="upload_type" @click="reSetType">{{titleText}}</div>

      <div class="create_close" @click="closeUserCreate" v-show="selecting == false">
        <svg class="icon_create_close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
          </path>
        </svg>
      </div>
    </div>


    <div class="animate_upload" id="uploadFile" v-show="uploadType == 'PT'">
      <form>
        <input type="text" name="userName" v-model="userName" v-show="false">
        <input type="file" accept="image/gif, image/jpeg, image/jpg, image/png" name="file" @change="getFile($event)">

        <div class="input_Box">
          <textarea class="userInput" id="userInput_PT" v-model="content" placeholder="输入想要发布的内容"></textarea>
        </div>

        <button @click="send_PT($event)" class="create_send" id="create_send_PT">发布</button>
      </form>

    </div>

    <div class="animate_upload" id="uploadMusic" v-show="uploadType == 'MT'">
      <div class="musicSearch">
        <input type="text" placeholder="搜索音乐" v-model="musicSearch">
        <button @click="search">搜索</button>
      </div>

      <div id="music_result" v-show="selecting == true">
        <!-- 音乐搜索结果组件 -->
        <div class="music_card" v-for="(item,index) in musicItems" :key="index" :data-music-id="index"
          @click="selectMusic">
          <div class="music_text">
            <div class="music_text_songName">{{item.name}}</div>
            <div class="music_text_singer">{{item.singer}}</div>
          </div>
          <div class="music_img">
            <img :src="item.img">
          </div>
        </div>
      </div>
      <div class="input_Box">
        <textarea class="userInput" id="userInput_MT" v-model="content" v-show="selecting == false"
          placeholder="输入想要发布的内容"></textarea>
      </div>
      <div id="create_send_MT">
        <button class="create_send" v-show="selecting == false" @click="send_MT">发布</button>
      </div>
    </div>

    <div class="animate_upload" v-show="uploadType=='T'" id="uploadPage_T">
      <div class="input_Box">
        <textarea class="userInput" v-model="content" placeholder="输入想要发布的内容"></textarea>
      </div>

      <button class="create_send" @click="send_T">发送</button>
    </div>

    <div class="typeSelect" v-if="uploadType =='default'">
      <div @click="setType('T')">
        <svg style="fill:#FFF;width:20px;height:20px;marginTop:14px;marginLeft:4px" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path
            d="M288 44v40c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16V44c0-8.837 7.163-16 16-16h256c8.837 0 16 7.163 16 16zM0 172v40c0 8.837 7.163 16 16 16h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16zm16 312h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm256-200H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16h256c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16z" />
        </svg>
        <br />
        文字</div>

      <div @click="setType('PT')">
        <svg style="fill:#FFF;width:20px;height:20px;marginTop:14px;marginLeft:5px" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" />
        </svg>
        <br />
        图文</div>
      <div @click="setType('MT')">
        <svg style="fill:#FFF;width:20px;height:20px;marginTop:14px;marginLeft:4px" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            d="M511.99 32.01c0-21.71-21.1-37.01-41.6-30.51L150.4 96c-13.3 4.2-22.4 16.5-22.4 30.5v261.42c-10.05-2.38-20.72-3.92-32-3.92-53.02 0-96 28.65-96 64s42.98 64 96 64 96-28.65 96-64V214.31l256-75.02v184.63c-10.05-2.38-20.72-3.92-32-3.92-53.02 0-96 28.65-96 64s42.98 64 96 64 96-28.65 96-64l-.01-351.99z" />
        </svg>
        <br />
        音文</div>
    </div>
  </div>

</template>
<script>
  import store from "./../store/store.js";

  export default {
    props: ["isMyZoom"],
    data() {
      return {
        titleText: "选择标签类型",
        uploadType: "default",

        userName: "",

        content: "",
        musicSearch: "",

        musicName: "",
        musicSinger: "",
        musicImg: "",
        musicPlayUrl: "",

        selecting: false,
        musicItems: [],

        file: "" // 上传文件
      };
    },
    /*     computed: {
          uploadType() {
            return this.$store.state.uploadType;
          }
        }, */
    methods: {
      closeUserCreate: function () {
        this.$store.commit("SHOWuserCreatePage", false);
        this.$store.commit("SHOWopacityBg", false);

        this.$data.content = "";
        this.$data.musicSearch = "";
      },
      setType: function (type) {
        this.uploadType = type
        if (type == "PT") {
          type = "图文"
        } else if (type == "MT") {
          type = "音文"
        } else if (type == "T") {
          type = "纯文"
        }
        this.titleText = "< " + type
      },
      reSetType: function () {
        this.uploadType = "default"
        this.titleText = "选择标签类型"
      },
      selectMusic: function (e) {
        let musicId = e.path[0].dataset.musicId;
        let music;
        if (musicId == undefined) {
          musicId = e.path[2].dataset.musicId;
          music = this.$data.musicItems[musicId];
        } else {
          music = this.$data.musicItems[musicId];
        }

        this.$data.musicSearch = `${music.name}-${music.singer}`;

        this.$data.musicName = music.name;
        this.$data.musicSinger = music.singer;
        this.$data.musicImg = music.img;
        this.$data.musicPlayUrl = music.playUrl;

        this.$data.selecting = false;
      },
      search: function () {
        const _this = this;

        this.$data.musicItems = [];

        this.$data.selecting = true;
        let musicSearch = this.$data.musicSearch;

        this.$http
          .get("/api/searchMusic", {
            params: {
              keyword: musicSearch
            }
          })
          .then(res => {
            let musics = res.data.data;
            this.$data.musicItems = musics;
          });
      },
      send_MT: function () {
        var userName = localStorage.getItem("userName"); // 获取当前用户名 用于在后端检索特定用户的文档
        var date = new Date().toLocaleString(); // 当前日期
        let itemName = localStorage.getItem("itemName")

        let key
        if (this.isMyZoom == true) {
          key = "1"
        } else {
          key = "0"
        }

        let params = {
          userName: userName,
          itemName: itemName,
          uploadType: this.uploadType,
          key: key,

          musicName: this.$data.musicName,
          musicSinger: this.$data.musicSinger,
          musicImg: this.$data.musicImg,
          musicPlayUrl: this.$data.musicPlayUrl,

          content: this.$data.content,
          date: date
        };

        this.$http
          .post("/api/uploadMusic", params)
          .then(res => {
            // 上传成功
            if (res.data.status == "1") {
              this.$data.content = "";
              this.$data.musicSearch = "";
              this.$data.musicItems = [];

              this.$store.commit("SHOWuserCreatePage", false); // 关闭上传编辑窗口
              this.$store.commit("SHOWopacityBg", false); // 关闭背景半透明遮罩

              store.commit("AlertShow", true);
              store.commit("AlertTip", "上传成功");
              this.$store.commit("ReloadPage", true); // 通知刷新页面
            } else {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "上传失败");
            }
          })
          .catch(reject => {
            console.log(reject);
            store.commit("AlertShow", true);
            store.commit("AlertTip", "出错了");
          });
      },
      send_T: function () {
        var userName = localStorage.getItem("userName"); // 获取当前用户名 用于在后端检索特定用户的文档
        var date = new Date().toLocaleString(); // 当前日期
        let itemName = localStorage.getItem("itemName")
        let key
        if (this.isMyZoom == true) {
          key = "1"
        } else {
          key = "0"
        }


        let params = {
          userName: userName,
          // itemName: ,
          itemName: itemName,
          uploadType: this.uploadType,
          key: key,

          content: this.$data.content,
          date: date
        };
        // console.log(params);

        this.$http
          .post("/api/uploadText", params)
          .then(res => {
            // 上传成功
            if (res.data.status == "1") {
              this.$data.content = "";

              this.$store.commit("SHOWuserCreatePage", false); // 关闭上传编辑窗口
              this.$store.commit("SHOWopacityBg", false); // 关闭背景半透明遮罩

              store.commit("AlertShow", true);
              store.commit("AlertTip", "上传成功");
              this.$store.commit("ReloadPage", true); // 通知刷新页面
            } else {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "上传失败");
            }
          })
          .catch(reject => {
            console.log(reject);
            store.commit("AlertShow", true);
            store.commit("AlertTip", "出错了");
          });
      },
      getFile: function (event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      send_PT: function (event) {
        event.preventDefault();
        let date = new Date().toLocaleString(); // 当前日期
        let itemId = localStorage.getItem("itemId")
        let itemName = localStorage.getItem("itemName")

        let formData = new FormData();

        if (this.file == "") {
          store.commit("AlertShow", true);
          store.commit("AlertTip", "请选择图片");
          return false
        }
        let key
        if (this.isMyZoom == true) {
          key = "1"
        } else {
          key = "0"
        }


        formData.append("name", this.userName);
        formData.append("content", this.content);
        formData.append("uploadType", this.uploadType);
        formData.append("key", key);
        formData.append("file", this.file);
        formData.append("itemId", itemId)
        formData.append("itemName", itemName);
        formData.append("date", date);

        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };

        this.$http
          .post("/api/uploadPhotoText", formData, config)
          .then(res => {
            // 图文上传成功
            if (res.data.status == "1") {
              this.$store.commit("SHOWuserCreatePage", false); // 关闭上传编辑窗口
              this.$store.commit("SHOWopacityBg", false); // 关闭背景半透明遮罩

              store.commit("AlertShow", true);
              store.commit("AlertTip", "发布成功");
              this.$store.commit("ReloadPage", true); // 通知刷新页面

              this.$data.content = ""
            } else {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "发布失败");
            }
          })
          .catch(reject => {
            console.log(reject);
            store.commit("AlertShow", true);
            store.commit("AlertTip", "出错了");
          });
      }
    },
    mounted() {
      const userName = localStorage.getItem("userName");
      this.$data.userName = userName;
    }
  };
</script>
<style>
  #userCreatePage {
    width: 100%;
    height: auto;
    background-color: #fff;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: slide 0.4s ease-out forwards;
    z-index: 22;
  }

  .upload_title {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .upload_type {
    font-size: 17px;
    font-weight: bold;
    color: #409eff;
    font-style: italic;
    margin-left: 5%;
    margin-top: 8px;
  }

  .typeSelect {
    width: 75%;
    display: inline-flex;
    justify-content: space-around;
    padding: 60px 20px;
  }

  .typeSelect div {
    width: 70px;
    height: 70px;
    background-color: #409eff;
    text-align: center;
    color: #FFF;
    border-radius: 100%;
    font-size: 15px;
    /* animation: scale 1s  */
    /* border: 1px solid #444 */
  }

  .create_close {
    width: 30px;
    height: 30px;
    border: 0;
    border-radius: 100%;
    background-color: #ff8d8d;
    color: #fff;
    margin-bottom: 0px;
    margin-top: -10px;
    text-align: center;
    transform: rotate(45deg);
    margin-right: 5%;
  }

  .create_close .icon_create_close {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    fill: #fff;
  }

  #uploadFile {
    width: 90%;
    margin-bottom: 15px;
  }

  #uploadFile label {
    font-size: 15px;
    background-color: rgb(138, 138, 138);
    padding: 4px;
    color: #fff;
  }

  #uploadFile input {
    font-size: 16px;
    margin-left: 8px;
  }

  #uploadMusic {
    width: 90%;
    flex: 1 1 1;
    display: flex;
    flex-direction: column;
  }

  #uploadMusic input {
    width: 70%;
    padding: 8px;
    border: 1px solid #c9c9c9;
    font-size: 16px;
  }

  #uploadMusic button {
    width: 20%;
    padding: 8px;
    font-size: 15px;
    border: 0;
    border-radius: 4px;
    background-color: #409eff;
    color: #fff;
    outline: none;
    margin-left: 10px;
  }

  .input_Box {
    width: 100%;
    text-align: center
  }

  #userInput_PT {
    width: 96%;
    margin-top: 10px
  }

  #userInput_MT {
    width: 96%;
    margin-top: 10px
  }

  .userInput {
    background: #ffffff;
    border-bottom-color: #ff6633;
    padding: 8px;
    border-bottom-width: 0px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    color: #2c2c2c;
    font-size: 16px;
    flex: 1;
    width: 86%;
    border-top: 1px solid rgb(231, 231, 231);
    border-bottom: 1px solid rgb(231, 231, 231);
  }

  textarea {
    resize: none;
    min-height: 210px;
  }

  #music_result {
    flex: 1;
    overflow: auto;
    margin-top: 7px;
    padding: 0;
  }

  .musicSearch {
    margin-top: 9px;
    margin-bottom: 8px;
  }

  .music_card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgb(230, 230, 230);
  }

  .music_card .music_text {
    font-size: 15px;
    color: #494949;
  }

  .music_text_songName {
    font-size: 16px;
    font-weight: bold;
  }

  .music_text_singer {
    font-size: 15px;
    margin-top: 5px;
  }

  .music_card .music_img img {
    width: 60px;
    height: 60px;
    overflow: hidden;
  }

  .create_send {
    width: 90%;
    height: 44px;
    border: 0;
    outline: none;
    border-radius: 8px;
    background-color: #409eff;
    color: #fff;
    font-size: 16px;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  #create_send_PT {
    margin-left: 5%
  }

  #create_send_MT {
    width: 100%;
    text-align: center
  }

  #create_send_MT button {
    width: 90%;
    height: 44px;
    border: 0;
    outline: none;
    border-radius: 8px;
    background-color: #409eff;
    color: #fff;
    font-size: 16px;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .play {
    width: 400px;
    height: 80px;
    display: block;
    background-color: red;
  }

  #uploadPage_T {
    width: 100%;
    text-align: center
  }

  #uploadPage_T button {
    width: 80%
  }

  .animate_upload {
    animation: opacity 0.23s ease;
  }

  @keyframes opacity {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(0%);
    }
  }
</style>