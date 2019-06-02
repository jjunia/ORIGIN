<template>
  <router-link tag="div" id="home_match" to="matchPage">
    <img src="" />
  </router-link>
</template>
<script>
  export default {
    name: 'home_match'
  }
</script>
<style>
  #home_match {
    width: 95%;
    height:61vh;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 1px 5px #333;
    margin-top: 15px;
    text-align: center;
    background-image: url("./../assets/homeMatch.jpg");
    background-position: center
  }

  #home_match img {
    max-width: 100%;
  }
</style>