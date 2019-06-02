<template>
  <div class="hot_item_frame">
    <router-link :to="{ name:'DetailItem', params:{ detailItemId: detailItemId, detailItemName: detailItemName} }">
      <p id="hot_item_name" class="hot_item_name">
        {{ itemName }}
      </p>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: 'hot_item_frame',
    props: ['itemName', 'itemId'],
    data() {
      return {
        detailItemId: this.itemId,
        detailItemName: this.itemName,
      }
    },
    mounted(){
      // console.log(this.detailItemName);
      // console.log(this.detailItemType);
      
    }
  }
</script>
<style>
  .hot_item_frame {
    height: auto;
    border-bottom: 1px solid #dcdfe6;
  }

  .hot_item_name {
    font-size: 15px;
    padding: 14px;
    margin: 0;
    padding-left: 20px;
    color: #409eff;
  }

  a:link,
  a:visited,
  a:active {
    color: #606266;
    text-decoration: none;
    width: 94%;
    align-self: center;
  }
</style>