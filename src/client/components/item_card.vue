<template>
  <div class="item_card">
    <div>
      <p class="item_card_name">
        <slot name="itemUserId"></slot>
        <span>
          <slot name="itemDate">服务器开小差了不给你数据</slot>

        </span>
        <span @click="deleteContent">
          <svg style="width:11px;height:11px;fill:#777" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z" />
          </svg>
        </span>
      </p>
    </div>

    <div class="item_card_music_content">

      <!-- 音乐类型 -->
      <div class="musicCard" v-if="type == 'MT'">
        <div class="musicImg">
          <slot name="musicImg">专辑图片</slot>
        </div>
        <div class="musicInfo">
          <div class="musicName">
            歌曲名: <slot name="musicName"></slot>
          </div>
          <div class="musicSinger">
            歌手: <slot name="musicSinger"></slot>
          </div>
        </div>
        <div class="item_musicPlay" @click="playMusic">
          <svg class="playIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
          </svg>
        </div>
      </div>
      <!-- 图类型 -->
      <div v-if="type == 'PT'" class="itemImg">
        <slot name="itemImg"></slot>
      </div>

      <p>
        <slot name="musicContent">服务器开小差了不给你数据</slot>
      </p>
    </div>

  </div>
</template>
<script>
  import store from './../store/store.js'

  export default {
    name: 'item_card',
    props: ['userId', 'playUrl', 'cardType', '_id', 'userName'],
    data() {
      return {
        detailUserId: this.userId,
        musicUrl: this.playUrl,
        likeIt: 'disLike',
        type: this.cardType,
        userPage: false
      }
    },
    methods: {
      btn_likeIt: function () {
        if (this.$data.likeIt == 'yesLike') {
          this.$data.likeIt = 'disLike'
        } else {
          this.$data.likeIt = 'yesLike'
        }
      },
      playMusic: function () {

        store.commit('SETmusicUrl', this.musicUrl)
      },
      deleteContent: function () {
        let params = {
          "key": "1",
          "userName": this.userName,
          "user_content_id": this._id
        }
        // console.log(params);
        this.$http.post('/api/deleteContent', params)
          .then((response) => {
            let res = response.data
            console.log(res);

            if (res.status == "1") {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "删除成功");
              this.$store.commit("ReloadPage", true); // 触发刷新
            } else {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "删除失败");
            }
          })


      }
    },
    mounted() {}
  }
</script>
<style>
  @import "./../assets/css/item_card.css";
</style>