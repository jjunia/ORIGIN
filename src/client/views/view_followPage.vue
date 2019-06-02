<template>

  <div id="view_followPage">
    <!-- <follow-item-frame v-for="userFollow in userFollows" :key="userFollow.index" :itemId="userFollow.id" :propitemName="userFollow.name" >
      <template slot="itemUpdate">{{ userFollow.update }}</template>
    </follow-item-frame> -->
    <div class="item_title_name">
      <p>{{ title }}</p>
    </div>
    <div class="contentSorll">
      <hot-item-frame v-for="Item in Items" :key="Item.index" :itemName="Item.name" :itemId="Item.id">
      </hot-item-frame>
    </div>

  </div>
</template>
<script>
  import buttonReturn from './../components/button_return.vue'
  import hotItemFrame from './../components/hot_item_frame.vue'

  export default {
    name: 'view_userFollow',
    components: {
      buttonReturn,
      hotItemFrame
    },
    data() {
      return {
        Items: [],
        title: ''
      }
    },
    methods: {
      goback: function () {
        window.history.length > 1 ?
          this.$router.go(-1) :
          this.$router.push('/')
      },
      getFollowInfo() {
        let account = localStorage.getItem("userName")
        this.$http
          .get("/api/followPage", {
            params: {
              account: account
            }
          })
          .then(response => {
            let res = response.data.data;

            let folItems = res.shift().userFollow;
            // console.log(folItems)

            for (let i in folItems) {
              let item = folItems[i].name.split('/')
              let id = item[0]
              let name = item[1]

              let fol = {
                name: name,
                id: id
              }
              this.$data.Items.push(fol)
            }
          })


          .catch(reject => {
            console.log(reject);
          });
      },
      getHotInfo() {
        this.$http
          .get("/api/hotPage")
          .then(response => {
            let res = response.data;
            this.$data.Items = res.data.shift().hotItem;
          })
          .catch(reject => {
            console.log(reject);
          });
      }
    },
    created() {
      let title = this.$route.params.title
      if (title == undefined) {
        this.title = localStorage.getItem('folhot')
      } else {
        this.title = title
        localStorage.setItem('folhot', title)
      }

    },
    mounted() {
      if (this.title === "关注标签") {
        this.getFollowInfo();
      } else {
        this.getHotInfo()
      }

    }

  }
</script>
<style>
  #view_followPage {
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

  a:link {
    text-decoration: none;
    width: 94%;
    align-self: center;
  }
</style>