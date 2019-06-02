<template>
  <div id="selfUser_info">
    <div id="selfUser_info_left">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="userPage_icon" viewBox="0 0 512 512">
          <path
            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
        </svg>

        <span>
          <slot name="userLike">服务器开小差了不给你数据</slot>
        </span>
      </div>
    </div>
    <div id="selfUser_info_right">
      <p id="user_name">
        <slot name="userName">服务器开小差了不给你数据</slot>
      </p>
    </div>
    <div id="createNewItem">
      <div @click="createItem">创建频道</div>
      <router-link tag="div" :to="{ name:'DetailItem', params:{ detailItemId: '私人空间', detailItemName: '私人空间'} }">
        私人空间
      </router-link>
    </div>
  </div>
</template>
<script>
  import store from './../store/store.js'

  export default {
    name: 'selfUser_info',
    data() {
      return {}
    },
    methods: {
      createItem() {
        store.commit('SHOWcreateItemPage', true)
        store.commit('SHOWopacityBg', true)
      }
    }
  }
</script>
<style scope>
  #selfUser_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 35px;
    padding-bottom: 35px;
    background-color: #409eff;
    color: #FFF
  }

  #user_head {
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }

  #user_name {
    font-style: italic;
    font-weight: bold;
    margin-top: 11px;
    margin-bottom: 15px;
    font-size: 26px;
  }

  .userPage_icon {
    width: 20px;
    height: 20px;
    margin: 0;
    padding: 0;
    fill: #FFF;
  }

  #selfUser_info_left {
    flex: 1;
    color: #FFF;
    font-size: 15px;
    text-align: center
  }

  #selfUser_info_left div {
    margin: 5px;
  }

  #selfUser_info_left div span {
    position: absolute;
    margin-top: 2px;
    margin-left: 8px;
  }

  #selfUser_info_right {
    flex: 2;
    text-align: center;
    color: #FFF;
  }

  #createNewItem {
    flex: 1;
    text-align: center;
  }

  #createNewItem div {
    width: 80%;
    margin-left: 7%;
    margin-top: 5px;
    background-color: rgb(28, 125, 236);
    padding: 4px;
  }
</style>