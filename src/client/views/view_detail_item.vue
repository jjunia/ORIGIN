<template>
  <div id="view_detail_item">
    <button-return></button-return>
    <p class="detail_title_name">{{ propitemName }}</p>

    <div id="btn_follow" @click="follow_item" v-if="itemId != '私人空间'">{{folText}}</div>

    <div class="contentSorll_detail">
      <div>
        <div v-if="isMyZoom != true">
          <item-card :cardType="itemData.user_content.user_content_uploadType" v-for="itemData of itemDatas"
            :key="itemData.index" :userId="itemData.user_account"
            :playUrl="itemData.user_content.user_content_musicPlayUrl" :contentId="itemData.user_content._id" :isMyZoom="isMyZoom">
            <template v-if="itemData.rename == null">
              <template v-if="itemData.user_account == userName" slot="itemUserId">
                自己
              </template>
              <template v-else slot="itemUserId">
                匿名
              </template>
            </template>
            <template v-else-if="itemData.rename != null" slot="itemUserId">
              {{ itemData.rename}}
            </template>

            <template slot="itemDate">{{ itemData.user_content.user_content_date}}</template>

            <template v-if="itemData.user_content.user_content_musicname!=''"
              slot="musicName">{{ itemData.user_content.user_content_musicname}}</template>
            <template v-if="itemData.user_content.user_content_musicSinger!=''"
              slot="musicSinger">{{ itemData.user_content.user_content_musicSinger}}</template>
            <img v-if="itemData.user_content.user_content_musicImg!=''"
              :src="itemData.user_content.user_content_musicImg" slot="musicImg">

            <img v-if="itemData.user_content.user_content_photoUrl!=''" slot="itemImg"
              :src="'./uploadPhoto/' + itemData.user_content.user_content_photoUrl">

            <p slot="musicContent">{{ itemData.user_content.user_content_content }}</p>
          </item-card>



        </div>

        <div v-if="isMyZoom == true">
          <item-card :cardType="itemData.user_content_uploadType" v-for="itemData of itemDatas" :key="itemData.index"
            :userId="itemData.user_account" :contentId="itemData._id" :playUrl="itemData.user_content_musicPlayUrl" :isMyZoom="isMyZoom" >
            <template slot="itemUserId">自己</template>
            <template slot="itemDate">{{ itemData.user_content_date}}</template>

            <template v-if="itemData.user_content_musicname!=''"
              slot="musicName">{{ itemData.user_content_musicname}}</template>
            <template v-if="itemData.user_content_musicSinger!=''"
              slot="musicSinger">{{ itemData.user_content_musicSinger}}</template>
            <img v-if="itemData.user_content_musicImg!=''" :src="itemData.user_content_musicImg" slot="musicImg">

            <img v-if="itemData.user_content_photoUrl!=''" slot="itemImg"
              :src="'./uploadPhoto/' + itemData.user_content_photoUrl">

            <p slot="musicContent">{{ itemData.user_content_content }}</p>
          </item-card>
        </div>
      </div>

      <div></div>
    </div>

    <button id="userCreate" @click="openUserCreate">
      <svg class="icon_create" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
        </path>
      </svg>
    </button>

    <upload v-show="userCreatePage" :isMyZoom="isMyZoom">
      <!-- <span slot="itemType">{{itemType}}</span> -->
    </upload>
  </div>

</template>
<script>
  import itemCard from "./../components/item_card_detail.vue";
  import buttonReturn from "./../components/button_return.vue";
  import upload from "./../components/upload.vue";
  import store from "./../store/store.js";

  export default {
    name: "view_detail_item",
    components: {
      itemCard,
      buttonReturn,
      upload
    },
    data() {
      return {
        itemDatas: [],
        userName: "",
        folText: "关注",
        folItems: [],
        isMyZoom: false
      };
    },
    computed: {
      userCreatePage() {
        return this.$store.state.userCreatePage;
      },
      ReloadPage() {
        return this.$store.state.ReloadPage;

      }
      // uploadType() {
      //   return this.$store.state.uploadType;
      // }
    },
    methods: {
      goback: function () {
        this.$router.push("/hotPage");
      },
      follow_item: function () {
        var folText = this.$data.folText;

        if (folText == "关注") {
          let params = {
            itemName: this.itemId,
            itemId: this.propitemName,
            userName: this.userName,
            it: "1"
          };

          this.$http
            .post("/api/followItem", params)
            .then(res => {
              if (res.data.status == "1") {
                store.commit("AlertShow", true);
                store.commit("AlertTip", "关注成功");
                this.$data.folText = "取消关注";
              } else {
                store.commit("AlertShow", true);
                store.commit("AlertTip", "关注失败");
              }
            })
            .catch(reject => {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "关注失败");
            });
        } else {
          let params = {
            itemName: this.itemId,
            itemId: this.propitemName,
            userName: this.userName,
            it: "0"
          };

          this.$http
            .post("/api/followItem", params)
            .then(res => {
              if (res.data.status == "1") {
                store.commit("AlertShow", true);
                store.commit("AlertTip", "取消关注成功");
                this.$data.folText = "关注";
              } else {
                store.commit("AlertShow", true);
                store.commit("AlertTip", "取消关注失败");
              }
            })
            .catch(reject => {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "取消关注失败");
            });
        }
      },
      openUserCreate: function () {
        this.$store.commit("SHOWuserCreatePage", true);
        this.$store.commit("SHOWopacityBg", true);
      },

      getDetailContent() {
        const _this = this;

        let params = {
          item_id: this.itemId,
          account: this.userName
        };

        this.$http
          .get("/api/detailItem", {
            params: params
          })
          .then(response => {
            let res = response.data.data;
            this.$data.itemDatas = res.shift().content;

            let folItems = res.shift().fol;

            for (let i in folItems) {
              let folItem = folItems[i].split("/");
              let itemName = folItem[1];

              if (itemName == _this.propitemName) {
                this.$data.folText = "取消关注";
                return false;
              } else {
                this.$data.folText = "关注";
              }
            }
          })
          .catch(reject => {
            store.commit("AlertShow", true);
            store.commit("AlertTip", "获取详情失败");
          });
      },

      // 个人空间
      getMyZoom() {
        const _this = this;

        let params = {
          item_id: this.itemId,
          account: this.userName
        };

        this.$http
          .get("/api/privatePage", {
            params: params
          })
          .then(response => {
            let res = response.data.data;
            this.$data.itemDatas = res.shift().content;
          })
          .catch(reject => {
            store.commit("AlertShow", true);
            store.commit("AlertTip", "获取详情失败");
          });
      }
    },
    created() {
      let itemId = this.$route.params.detailItemId;
      let propitemName = this.$route.params.detailItemName;
      this.$data.userName = localStorage.getItem("userName");


      // console.log(propitemName);
      if (itemId == undefined || itemId == null) {
        this.itemId = localStorage.getItem("itemId");
        this.propitemName = localStorage.getItem("itemName");
        // this.itemType = localStorage.getItem("itemType");
        this.$data.userName = localStorage.getItem("userName");

        if (this.itemId == "私人空间") {
          this.isMyZoom = true;
          this.getMyZoom();
        } else {
          this.getDetailContent();
        }

        // let localItem = localStorage.setItem("itemName", propitemName);
        // if (localItem == undefined) {
        //   this.itemId = itemId;
        //   this.propitemName = propitemName;
        //   // this.itemType = itemType;
        //   localStorage.setItem("itemId", itemId);
        //   localStorage.setItem("itemName", propitemName);
        //   // localStorage.setItem("itemType", itemType);
        // }
      } else {
        this.itemId = itemId;
        this.propitemName = propitemName;
        // this.itemType = itemType;
        localStorage.setItem("itemId", itemId);
        localStorage.setItem("itemName", propitemName);
        // localStorage.setItem("itemType", itemType);

        if (this.itemId == "私人空间") {
          this.isMyZoom = true;
          this.getMyZoom();
        } else {
          this.getDetailContent();
        }
      }
    },
    mounted() {
      this.$store.commit("SHOWuserCreatePage", false);
    },
    watch: {
      ReloadPage(val) {
        // console.log(val)
        if (val == true) {
          if (this.isMyZoom == true) {
            this.getMyZoom();
            this.$store.commit("ReloadPage", false); // 刷新完成
          } else {
            this.getDetailContent();
            this.$store.commit("ReloadPage", false); // 刷新完成
          }
        }

      }
    }
  };
</script>
<style>
  @import "./../assets/css/view_detail_item.css";
</style>