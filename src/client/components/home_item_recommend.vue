<template>
  <div id="home_item_recommend">
    <p id="home_item_name2">推荐的人</p>
    <router-link v-for="(user,index) in userRecommend" :key="index" tag="div" :to="{ name:'OtherUser', params:{ detailUserId: user } }" class="home_item_people">
      <svg class="icon_recommend" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z" /></svg>  
    </router-link>

</div>
</template>
<script>
import store from "./../store/store.js"

  export default {
    name: 'home_item_recommend',
    data() {
      return {
        detailUser: []
      }
    },
    computed: {
      userRecommend() {
        return this.$store.state.userRecommend
      },
    },
    mounted(){
    }
  }
</script>
<style>
  #home_item_recommend {
    width: 94%;
    height: auto;
    margin-top: 8px;
    border: 1px solid #dcdfe6;
    color: #606266;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around
  }

  #home_item_name2 {
    font-size: 15px;
    padding: 15px;
    margin: 0;
    padding-left: 20px;
    color: #409eff;
  }

  .home_item_people {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    margin-right: 5px;
    margin-bottom: 10px;
    border-radius: 100%;
    background-color: #ff9191;
  }
  .icon_recommend{
    width: 22px;
    height: 22px;
    fill: #ffffff;
    margin-left: 14px;
    margin-top: 14px; 
  }
</style>