<template>
  <div id="view_hotPage">
    <div class="item_title_name">
      <p>{{ title }}</p>
    </div>

    <div @click="searchPage" id="search_btn">
      <svg class="icon" style="fill:#FFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
        </path>
      </svg>
    </div>

    <div class="contentSorll">
      <div v-show="searchResult">
        <hot-item-frame v-for="Item in ItemsSearch" :key="Item.index" :itemName="Item.item_name" :itemId="Item._id">
        </hot-item-frame>
      </div>
      <div v-show="!searchResult">
        <hot-item-frame v-for="Item in Items" :key="Item.index" :itemName="Item.item_name" :itemId="Item.item_id">
        </hot-item-frame>
      </div>
    </div>

    <div id="searchItemPage" v-show="showSearchItem">
      <div id="searchReturn" @click="searchReturn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z">
          </path>
        </svg>
      </div>
      <input id="search_Input" v-model="search" placeholder="☍ 搜索标签关键字">
      <button @click="searchItem">搜索</button>
    </div>
  </div>
</template>
<script>
  import buttonReturn from "./../components/button_return.vue";
  import hotItemFrame from "./../components/hot_item_frame.vue";
  import homeSearch from "./../components/home_search.vue";

  export default {
    name: "view_hotPage",
    components: {
      buttonReturn,
      hotItemFrame,
      homeSearch
    },
    data() {
      return {
        Items: [],
        ItemsSearch: [],
        title: "",
        showSearchItem: false,
        search: "",
        searchResult: false
      };
    },
    methods: {
      goback: function () {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
      },
      getFollowInfo() {
        this.$http
          .get("/api/followPage")
          .then(response => {
            let res = response.data;
            this.$data.Items = res.data.shift().userFollow;
          })
          .catch(reject => {
            console.log(reject);
            localStorage.setItem("token", "");
            router.replace({
              path: "/LoginPage",
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          });
      },
      getHotInfo() {
        this.$http
          .get("/api/hotPage")
          .then(response => {
            let res = response.data;
            // console.log(response);

            this.$data.Items = response.data;
          })
          .catch(reject => {
            console.log(reject);
          });
      },
      searchPage() {
        this.showSearchItem = true;
        this.searchResult = true;
        this.ItemsSearch = []
      },
      searchItem: function () {
        let params = {
          search: this.search
        };
        this.$http.post('/api/searchItem', params)
          .then((response) => {
            let res = response.data.data
            // console.log(res);
            this.ItemsSearch = res.items
          })

        // this.ItemsSearch = [{"item_id":"item1","item_name":"音乐","item_browse":0},{"item_id":"item2","item_name":"摄影","item_browse":0},{"item_id":"item13","item_name":"啊啊是","item_browse":0},];
      },
      searchReturn: function () {
        this.showSearchItem = false;
        this.searchResult = false
        this.getHotInfo();
      }
    },
    created() {
      let title = this.$route.params.title;
      if (title == undefined) {
        this.title = localStorage.getItem("folhot");
      } else {
        this.title = title;
        localStorage.setItem("folhot", title);
      }
    },
    mounted() {
      this.$store.commit("SHOWFooter", true);
      if (this.title === "关注标签") {
        this.getFollowInfo();
      } else {
        this.getHotInfo();
      }
    }
  };
</script>
<style>
  #view_hotPage {
    display: flex;
    flex-direction: column;
  }

  .item_title_name {
    width: 100%;
    height: auto;
    right: 8%;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
    background-color: #409eff;
    color: #fff;
    font-style: italic;
  }

  .contentSorll {
    flex: 1;
    overflow: auto;
  }

  #search_btn {
    position: absolute;
    right: 25px;
    top: 19px;
  }

  #searchItemPage {
    position: absolute;
    top: 0;
    padding: 13px 0px;
    background-color: #409eff;
    width: 100%;
    text-align: center;
    display: inline-flex;
    align-items: center;
    align-content: center;
    justify-content: space-around;
    z-index: 22;
    animation: fromLeft ease-in-out 0.33s;
  }

  #search_Input {
    width: 200px;
    color: #606266;
    background-color: #f2f6fc;
    font-size: 14px;
    padding: 4px;
    border: 1px solid rgb(211, 211, 211);
    font-family: "Microsoft YaHei";
    border-radius: 6px;
    text-align: center;
  }

  #searchItemPage button {
    width: 70px;
    padding-top: 4px;
    margin-right: 20px;
    padding-bottom: 4px;
    background-color: #fff;
    color: #409eff;
    border: 1px solid #409eff;
    border-radius: 6px;
    outline: none;
  }

  #searchReturn {
    width: 18px;
    height: 18px;
    margin-left: 20px;
  }

  #searchReturn svg {
    fill: #fff;
    width: 18px;
    height: 18px;
  }

  a:link {
    text-decoration: none;
    width: 94%;
    align-self: center;
  }

  @keyframes fromLeft {
    0% {
      left: 100%;
    }

    100% {
      left: 0%;
    }
  }
</style>