<template>
  <div id="button_return" v-on:click="goback">
    <span id="button_name">返回</span>
  </div>
</template>
<script>
export default {
  name: 'button_return',
  data () {
    return {
    }
  },
  methods: {
    goback: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style>
#button_return {
  width: 66px;
  height: 30px;
  background-color: #409eff;
  color: #fff;
  border-radius: 5px;
  margin-top: 24px;
  margin-left: 16px;
  margin-bottom: 15px;
}
#button_name {
  position: absolute;
  margin-top: 5px;
  margin-left: 18px;
  font-size: 15px;
}
</style>
