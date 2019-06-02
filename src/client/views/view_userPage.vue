<template>
  <div id="view_userPage">
    <self-user-info>
      <template slot="userName">{{ userName }}</template>
      <template slot="userLike">{{ userInfo.userLike }}</template>
    </self-user-info>

    <div id="userPage_sort">
      <p :class="{active:sort==0}" @click="sort=0">TIME</p>
      <p :class="{active:sort==1}" @click="sort=1">TITLE</p>
    </div>

    <div v-show="sort===0">
      <item-card :cardType="itemInfo.user_content_uploadType" v-for="itemInfo of itemInfos" :key="itemInfo.index"
        :playUrl="itemInfo.user_content_musicPlayUrl" :userId="itemInfo.user_item_id" :_id="itemInfo._id"
        :userName="userName">
        <template slot="itemUserId">{{ itemInfo.user_item_name}}
        </template>
        <template slot="itemDate">{{ itemInfo.user_content_date}}</template>

        <template v-if="itemInfo.user_content_musicname!=''"
          slot="musicName">{{ itemInfo.user_content_musicname}}</template>
        <template v-if="itemInfo.user_content_musicSinger!=''"
          slot="musicSinger">{{ itemInfo.user_content_musicSinger}}</template>
        <img v-if="itemInfo.user_content_musicImg!=''" :src="itemInfo.user_content_musicImg" slot="musicImg">

        <img v-if="itemInfo.user_content_photoUrl!=''" slot="itemImg"
          :src="'./uploadPhoto/' +itemInfo.user_content_photoUrl">

        <p slot="musicContent">{{ itemInfo.user_content_content }}</p>
      </item-card>
    </div>
    <br />
    <div v-show="sort===1">
      <user-page-sort-by-name v-show="sort===1" v-for="itemTitle of itemTitles" :key="itemTitle.index"
        :itemName="itemTitle">
        <template slot="itemName">{{ itemTitle }}</template>
      </user-page-sort-by-name>
    </div>


    <div id="createItem" v-show="createItemPage">
      <div class="create_close" @click="closeItemPage">
        <svg class="icon_create_close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
          </path>
        </svg>
      </div>
      <label>你的积分为：<b>{{integral}}</b></label>
      <input id="createItemName" placeholder="输入标签名" v-model="newItemName" maxlength="12" />
      <button @click="createItem">创建</button>
    </div>

  </div>
</template>
<script>
  import buttonReturn from "./../components/button_return.vue";
  import selfUserInfo from "./../components/selfUser_info.vue"
  import userPageSortByName from "./../components/userPage_sortByName.vue";
  import itemCard from "./../components/item_card.vue";
  import store from './../store/store.js'

  export default {
    name: "view_userPage",
    components: {
      buttonReturn,
      selfUserInfo,
      itemCard,
      userPageSortByName
    },
    data() {
      return {
        sort: 0,
        newItemName: "",
        itemTitles: [],
        itemInfos: [],
        userInfo: {
          userLike: "",
          userBrowse: "",
          fakeName: ""
        },
        integral: 0
      }
    },
    computed: {
      userName() {
        return this.$store.state.userName;
      },
      createItemPage() {
        return this.$store.state.createItemPage
      },
      ReloadPage() {
        return this.$store.state.ReloadPage;
      }
    },
    methods: {
      createItem() {
        let userName = localStorage.getItem("userName")

        if (this.integral < 60) {
          store.commit("AlertShow", true);
          store.commit("AlertTip", "创建一个标签至少需要60分，您的积分不够喔");
          return false
        }

        let params = {
          userName: userName,
          newItemName: this.newItemName,
        };

        this.$http
          .post("/api/createItem", params)
          .then(res => {
            // 上传成功

            if (res.data.status == "0") {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "标签创建失败");
            } else if (res.data.status == "1") {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "标签创建成功");

              let oldVal = this.$data.integral
              let newVal = Number(oldVal - 60)
              console.log(newVal);

              this.$data.integral = newVal

              this.$data.newItemName = ""
              this.$store.commit('SHOWcreateItemPage', false) // 关闭创建标签窗口
              this.$store.commit("SHOWopacityBg", false); // 关闭背景半透明遮罩
            } else if (res.data.status == "-1") {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "标签名已存在");
            }

          })
          .catch(reject => {
            console.log(reject);
            store.commit("AlertShow", true);
            store.commit("AlertTip", "出错了");
          });

      },
      closeItemPage() {
        store.commit('SHOWcreateItemPage', false)
        store.commit('SHOWopacityBg', false)
      },
      getHomeInfo() {

        let account = localStorage.getItem("userName")
        this.$http
          .get("/api/userPage", {
            params: {
              account: account
            }
          })
          .then(response => {
            let res = response.data;
            // console.log(res.data);

            // console.log(this.$data.userInfo.userName)
            this.$data.fakeName = res.data.shift().userName;
            this.$data.userInfo.userBrown = res.data.shift().userBrowse;
            this.$data.userInfo.userLike = res.data.shift().userLike;
            //console.log(res.data.shift().content.shift().user_item_content_content)
            // this.$data.itemInfos.shift().content = res.data.shift().content

            let content = res.data.shift().content
            // console.log(content[4])
            this.$data.itemInfos = content;
            this.$data.itemTitles = res.data.shift().userItem
            this.$data.integral = res.data.shift().point
          })
          .catch(reject => {
            console.log(reject);
          });
      }
    },

    mounted() {
      this.getHomeInfo();
    },
    watch: {
      ReloadPage(val) {
        // console.log(val)
        if (val == true) {
          this.getHomeInfo();
          this.$store.commit("ReloadPage", false); // 刷新完成
        }
      }
    }
  };
</script>
<style>
  @import "./../assets/css/view_userPage.css";
</style>