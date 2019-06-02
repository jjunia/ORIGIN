<template>
  <div id="home_item_frame">
    <p id="home_item_name">
      <slot name="itemName"></slot>
      {{ title }}
    </p>
    <div id="home_item_content">
      <slot name="itemContent">服务器出门了</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home_item_frame',
  props: ['title'],
  data () {
    return {
    }
  }
}
</script>
<style>
#home_item_frame {
  height: auto;
  border: 1px solid #dcdfe6;
  color: #606266;
  border-radius: 10px;
  margin-top: 10px;
}
#home_item_name {
  font-size: 15px;
  padding: 15px;
  margin: 0;
  padding-left: 20px;
  color: #409eff;
  border-bottom: 1px solid #e4e7ed;
}
#home_item_content {
  height: auto;
  background-color: #ebeef5;
  padding: 15px;
}
#home_item_content p {
  margin: 0;
  text-indent: 2em;
}
</style>
