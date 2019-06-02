<template>
  <div id="home_search">
    
    <input id="search" v-model="search" placeholder="☍ 搜索标签">
    <button @click="searchItem">搜索</button>
  </div>
</template>
<script>
  export default {
    name: "view_detail_item",
    data() {
      return {
        search: ""
      }
    },
    methods: {
      searchItem: function () {
        let params = {
          search: this.search
        }
        console.log(params);
        
      }
    }
  }
</script>
<style>
  #home_search {
    width: 100%;
    text-align: center
  }

  #search {
    width: 70%;
    height: 18px;
    color: #606266;
    background-color: #F2F6FC;
    font-size: 15px;
    padding: 4px;
    border: 1px solid rgb(211, 211, 211);
    font-family: 'Microsoft YaHei';
    border-radius: 10px;
    text-align: center;
  }

  #home_search button {
    width: 20%;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #FFF;
    color: #409eff;
    border: 1px solid #409eff;
    border-radius: 6px;
    outline: none
  }
</style>