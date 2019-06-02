<template>
  <div id="sortByName">
      <p>
        <slot name="itemName"></slot>
      </p>
  </div>
</template>
<script>
export default {
  name: 'userPage_sortByName',
  props: ['itemName'],
  data () {
    return {
    }
  }
}
</script>
<style>
#sortByName {
  width: 96%;
  align-self: center;
}
#sortByName p {
  color: #409eff;
  margin: 10px;
  margin-left: 25px;
  padding: 0;
  font-size: 15px;
}
</style>
