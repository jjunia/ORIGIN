<template>
  <div id="view_otherUser">
    <!-- <button-return v-on:click="goback"></button-return> -->
    <div id="pageOther_return" @click="goback" v-if="!isSmallWin">
      <span id="pageOther_name">返回</span>
    </div>

    <div id="pageOther_close" @click="closeSmallWin" v-if="isSmallWin">
      <span id="pageOther_name">关闭</span>
    </div>

    <other-user-info style="" :otherName="otherInfo.otherName" :rename="reName" :likeList="likeList"
      :userLike="otherInfo.userLike" :isWin="isSmallWin">
      <template slot="userName">{{ otherInfo.userId }}</template>
    </other-user-info>

    <div id="userPage_sort">
      <p :class="{active:sort==0}" @click="sort=0">TIME</p>
      <p :class="{active:sort==1}" @click="sort=1">TITLE</p>
    </div>

    <div v-show="sort===0">
      <item-card :cardType="itemInfo.user_content_uploadType" v-for="itemInfo of itemInfos" :key="itemInfo.index"
        :playUrl="itemInfo.user_content_musicPlayUrl" :userId="itemInfo.user_item_id">
        <template slot="itemUserId">{{ itemInfo.user_item_name}}
        </template>
        <template slot="itemDate">{{ itemInfo.user_content_date}}</template>

        <template v-if="itemInfo.user_content_musicname!=''"
          slot="musicName">{{ itemInfo.user_content_musicname}}</template>
        <template v-if="itemInfo.user_content_musicSinger!=''"
          slot="musicSinger">{{ itemInfo.user_content_musicSinger}}</template>
        <img v-if="itemInfo.user_content_musicImg!=''" :src="itemInfo.user_content_musicImg" slot="musicImg">

        <img v-if="itemInfo.user_content_photoUrl!=''" slot="itemImg" :src="'./uploadPhoto/' +itemInfo.user_content_photoUrl">

        <p slot="musicContent">{{ itemInfo.user_content_content }}</p>
      </item-card>
    </div>
    <br />
    <div v-show="sort===1">
      <user-page-sort-by-name v-for="userItem of userItems" :key="userItem.index" :itemName="userItems.userItem">
        <template slot="itemName">{{userItem}}</template>
      </user-page-sort-by-name>
    </div>
  </div>
</template>
<script>
  import buttonReturn from './../components/button_return.vue'
  import otherUserInfo from './../components/otherUser_Info.vue'
  import userPageSortByName from './../components/userPage_sortByName.vue'
  import itemCard from "./../components/item_card_detail.vue"
  import store from './../store/store.js'

  export default {
    name: 'view_otherUser',
    components: {
      buttonReturn,
      otherUserInfo,
      userPageSortByName,
      itemCard
    },
    data() {
      return {
        userName: "",
        isSmallWin: false,
        sort: 0,
        itemInfos: [],
        userItems:[],
        otherInfo: {
          otherName: '',
          userLike: ''
        },
        reName: '',
        likeList: []
      }
    },
    computed: {

    },
    methods: {
      goback: function () {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      },
      closeSmallWin: function () {
        this.$store.commit("SHOWSmallPage", false);
      },
      getHomeInfo() {
        let params = {
          account: this.userName,
          other: this.otherInfo.otherName
        }

        this.$http
          .post("/api/otherUserPage", params)
          .then(response => {
            let res = response.data;
            //  console.log(res);

            let userLike = []
            // console.log(typeof (userLike));
            userLike = res.data.shift().userLike;
            this.$data.likeList = userLike;
            // console.log(this.$data.likeList);

            this.$data.otherInfo.userLike = userLike.length;
            this.$data.itemInfos = res.data.shift().content;
            this.$data.reName = res.data.shift().rename;
            this.$data.userItems = res.data.shift().userItem;
          })
          .catch(reject => {
            console.log(reject);
          });
      }
    },
    created() {
      let otherName = this.$route.params.detailUserId
      this.$data.otherInfo.otherName = otherName

      var page = this.$route.params.smallWin
      if (page == "1") {
        this.$data.isSmallWin = true
      } else {
        this.$data.isSmallWin = false
      }


      let userName = localStorage.getItem("userName")
      this.$data.userName = userName

      this.getHomeInfo();
    },
    mounted() {

      // console.log(this.$data.otherInfo.otherName)
    }

  }
</script>
<style scope>
  #view_otherUser {
    display: flex;
    flex-direction: column;
  }

  #userPage_sort {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    box-shadow: 0px 2px 2px rgb(109, 109, 109);
    background-color: #409eff;
  }

  #userPage_sort p {
    margin: 6px;
    font-size: 15px;
    color: #FFF;
  }

  .active {
    padding-top: 5px;
  }

  #pageOther_return {
    position: absolute;
    width: 66px;
    height: 30px;
    background-color: #fff;
    color: #409eff;
    border-radius: 5px;
    margin-top: 24px;
    margin-left: 16px;
    margin-bottom: 15px;
  }

  #pageOther_close {
    position: absolute;
    width: 66px;
    height: 30px;
    background-color: #fff;
    color: #409eff;
    border-radius: 5px;
    margin-top: 12px;
    left: 15px;
    margin-bottom: 15px;
  }

  #pageOther_name {
    position: absolute;
    margin-top: 5px;
    margin-left: 18px;
    font-size: 15px;
  }
</style>