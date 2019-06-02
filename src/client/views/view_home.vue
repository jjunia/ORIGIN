<template>
  <div id="view_home">
    <header id="home_header">
      <span id="home_logo">ORIGIN</span>
      <div id="location">广州大学华软软件学院</div>
    </header>
    <home-match></home-match>

    <home-item-recommend></home-item-recommend>
    <!-- <button @click="clearLocal">.</button> -->
  </div>
</template>

<script>
  import homeSearch from "./../components/home_search.vue";
  import homeMatch from "./../components/home_match.vue";
  import homeItemRecommend from "./../components/home_item_recommend.vue";
  import store from "./../store/store.js"

  export default {
    name: "view_home",
    components: {
      homeSearch,
      homeMatch,
      homeItemRecommend,
    },
    data() {
      return {};
    },
    methods: {
      clearLocal: function () {
        localStorage.clear();
      },
      getUserRecommend() {
        let userName = localStorage.getItem("userName")

        this.$http
          .get("/api/userRecommend", {
            params: {
              userName: userName
            }
          })
          .then(response => {
            let res = response.data;
            localStorage.setItem("recommendList", res)
            this.$store.commit('SETuserRecommend', res)
          })
          .catch(reject => {
            console.log(reject);
          });
      }
    },
    created() {
      var userName = localStorage.getItem("userName");
      this.$store.commit("SETuserName", userName);
    },
    mounted() {
      let recommendCount = localStorage.getItem("recommendCount")

      if (recommendCount == null) {
        this.getUserRecommend()
        localStorage.setItem("recommendCount", 1)
        console.log('获取推荐人');
      } else {
        let recommend = localStorage.getItem("recommendList")
        let recommendList = recommend.split(",")
        this.$store.commit('SETuserRecommend', recommendList)
      }

      this.$store.commit("SHOWFooter", true);
    }
  };
</script>

<style>
  html,
  body {
    padding: 0;
    margin: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
  }

  #view_home {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    /* height: 91vh; */
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #home_header {
    width: 100%;
    height: 13vh;
    box-shadow: 0px 1px 10px #333;
    display: inline-flex;
    align-content: center;
    justify-content: space-around;
    text-align: center;
    align-items: center;
  }

  #home_logo {
    color: #409eff;
    font-size: 34px;
    font-weight: 500;
    /* position: absolute;
    margin-top: 22px;
    left: 26px; */
    font-family: "lucida grande", "lucida sans unicode", lucida, helvetica,
      "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }

  #location {
    /* position: absolute;
    right: 10px;
    font-size: 15px;
    margin-top: 30px; */
    color: rgb(138, 138, 138);
    font-size: 14px;
    margin-left: 20px;
  }
</style>