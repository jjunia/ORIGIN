<template>
  <div id="app">
    <div class="musicPlayer" v-show="ShowMusicPlay">
      <audio controls autoplay :src="musicUrl"></audio>
    </div>

    <transition :name="transitionName">
      <!-- <div> -->
      <router-view></router-view>
      <!-- <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive> -->
      <!-- </div> -->
    </transition>

    <footer id="home_footer" v-show="ShowFooter">
      <router-link tag="div" class="home_item_frame" to="/">
        <!-- 首页 -->
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path
            d="M488 312.7V456c0 13.3-10.7 24-24 24H348c-6.6 0-12-5.4-12-12V356c0-6.6-5.4-12-12-12h-72c-6.6 0-12 5.4-12 12v112c0 6.6-5.4 12-12 12H112c-13.3 0-24-10.7-24-24V312.7c0-3.6 1.6-7 4.4-9.3l188-154.8c4.4-3.6 10.8-3.6 15.3 0l188 154.8c2.7 2.3 4.3 5.7 4.3 9.3zm83.6-60.9L488 182.9V44.4c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12V117l-89.5-73.7c-17.7-14.6-43.3-14.6-61 0L4.4 251.8c-5.1 4.2-5.8 11.8-1.6 16.9l25.5 31c4.2 5.1 11.8 5.8 16.9 1.6l235.2-193.7c4.4-3.6 10.8-3.6 15.3 0l235.2 193.7c5.1 4.2 12.7 3.5 16.9-1.6l25.5-31c4.2-5.2 3.4-12.7-1.7-16.9z">
          </path>
        </svg>
      </router-link>

      <!-- <router-link tag="div" class="home_item_frame" :to="{ name:'FollowPage', params:{ title: titleDis } }"> -->
      <router-link tag="div" class="home_item_frame" :to="{ name:'HotPage', params:{ title: titleDis } }">
        <!-- 探索发现 -->
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <path
            d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm-11.34 240.23c-2.89 4.82-8.1 7.77-13.72 7.77h-.31c-4.24 0-8.31 1.69-11.31 4.69l-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31l5.66 5.66c3 3 4.69 7.07 4.69 11.31V304c0 8.84-7.16 16-16 16h-6.11c-6.06 0-11.6-3.42-14.31-8.85l-22.62-45.23c-2.44-4.88-8.95-5.94-12.81-2.08l-19.47 19.46c-3 3-7.07 4.69-11.31 4.69H50.81C49.12 277.55 48 266.92 48 256c0-110.28 89.72-200 200-200 21.51 0 42.2 3.51 61.63 9.82l-50.16 38.53c-5.11 3.41-4.63 11.06.86 13.81l10.83 5.41c5.42 2.71 8.84 8.25 8.84 14.31V216c0 4.42-3.58 8-8 8h-3.06c-3.03 0-5.8-1.71-7.15-4.42-1.56-3.12-5.96-3.29-7.76-.3l-17.37 28.95zM408 358.43c0 4.24-1.69 8.31-4.69 11.31l-9.57 9.57c-3 3-7.07 4.69-11.31 4.69h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.767 26.767 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a7.978 7.978 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.18 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v24.6z">
          </path>
        </svg>
      </router-link>

      <router-link tag="div" id="myPage" class="home_item_frame" to="userPage">
        <!-- 我的 -->
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z">
          </path>
        </svg>
      </router-link>

      <router-link tag="div" class="home_item_frame" :to="{ name:'FollowPage', params:{ title: titleFol } }">
        <!-- 关注标签 -->
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
          <path
            d="M96.06 454.35c.01 6.29 1.87 12.45 5.36 17.69l17.09 25.69a31.99 31.99 0 0 0 26.64 14.28h61.71a31.99 31.99 0 0 0 26.64-14.28l17.09-25.69a31.989 31.989 0 0 0 5.36-17.69l.04-38.35H96.01l.05 38.35zM0 176c0 44.37 16.45 84.85 43.56 115.78 16.52 18.85 42.36 58.23 52.21 91.45.04.26.07.52.11.78h160.24c.04-.26.07-.51.11-.78 9.85-33.22 35.69-72.6 52.21-91.45C335.55 260.85 352 220.37 352 176 352 78.61 272.91-.3 175.45 0 73.44.31 0 82.97 0 176zm176-80c-44.11 0-80 35.89-80 80 0 8.84-7.16 16-16 16s-16-7.16-16-16c0-61.76 50.24-112 112-112 8.84 0 16 7.16 16 16s-7.16 16-16 16z">
          </path>
        </svg>
      </router-link>

      <div id="musicPlay" @click="musicPlay">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            d="M511.99 32.01c0-21.71-21.1-37.01-41.6-30.51L150.4 96c-13.3 4.2-22.4 16.5-22.4 30.5v261.42c-10.05-2.38-20.72-3.92-32-3.92-53.02 0-96 28.65-96 64s42.98 64 96 64 96-28.65 96-64V214.31l256-75.02v184.63c-10.05-2.38-20.72-3.92-32-3.92-53.02 0-96 28.65-96 64s42.98 64 96 64 96-28.65 96-64l-.01-351.99z">
          </path>
        </svg>
      </div>
    </footer>

    <transition name="slide-right">
      <alert-tip v-show="tipShow">
        <template slot="tip">{{tip}}</template>
      </alert-tip>
    </transition>

    <div class="opacityBg" v-show="opacityBg"></div>
  </div>
</template>
<script>
  import store from "./store/store.js";
  import alertTip from "./components/alertTip.vue";

  export default {
    name: "app",
    components: {
      alertTip
    },
    data() {
      return {
        transitionName: "",
        titleFol: "关注标签",
        titleDis: "探索发现",
        ShowMusicPlay: false
      };
    },
    computed: {
      tip() {
        return this.$store.state.tip;
      },
      tipShow() {
        return this.$store.state.tipShow;
      },
      opacityBg() {
        return this.$store.state.opacityBg;
      },
      musicUrl() {
        return this.$store.state.musicUrl;
      },
      uploadType() {
        return this.$store.state.uploadType;
      },
      ShowFooter() {
        return this.$store.state.ShowFooter
      }
    },
    methods: {
      musicPlay: function () {
        let ShowMusicPlay = this.$data.ShowMusicPlay;
        if (ShowMusicPlay == false) {
          if (this.musicUrl == "") {
            store.commit("AlertShow", true);
            store.commit(
              "AlertTip",
              "播放列表为空，去音乐频道挑选你喜欢的音乐吧~"
            );
          }

          this.ShowMusicPlay = true;
        } else if (ShowMusicPlay == true) {
          this.ShowMusicPlay = false;
        }
      }
    },
    watch: {
      // 使用watch 监听$router的变化
      $route(to, from) {
        // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > from.meta.index) {
          // 设置动画名称
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      }
    }
  };
</script>
<style>
  html,
  body {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #home_footer {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 8vh;
    display: flex;
    position: fixed;
    background-color: rgb(255, 255, 255);
    bottom: 0;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid rgb(209, 209, 209);
  }

  #home_footer #myPage .icon {
    width: 32px;
    height: 32px;
  }

  .home_item_frame {
    height: auto;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin: 0;
    padding: 0;
    fill: #78b3ff;
  }

  .icon_create {
    width: 36px;
    height: 36px;
    margin: 0;
    padding: 4px;
    fill: #78b3ff;
  }

  .opacityBg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 20;
    background-color: rgba(59, 59, 59, 0.87);
  }

  .musicPlayer {
    width: 100%;
  }

  .musicPlayer audio {
    width: 100%;
  }

  .slide-right-enter-active,
  .slide-left-enter-active {
    will-change: transformX;
    transition: all 250ms;
  }

  /*.slide-right-leave-active,
  .slide-left-leave-active {
     will-change: transformX; */
  /* transition: all 0ms; */
  /* position: absolute; 
  }*/

  .slide-right-enter {
    opacity: 0;
    transform: translateX(-100%);
  }

  .slide-right-leave-active {
    opacity: 0;
    /* transform: translateX(100%); */
  }

  .slide-left-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .slide-left-leave-active {
    opacity: 0;
    /* transform: translateX(-100%); */
  }
</style>