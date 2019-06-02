import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'
import axios from 'axios'

import VueSocketio from "vue-socket.io"
import socketIo from "socket.io-client/dist/socket.io"

Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(VueSocketio, socketIo("http://192.168.191.1:4000"), {
  'reconnect': false,
  'auto connect': false
})

// Vue.use(VueSocketio, socketIo("http://172.16.101.63:4000"), {
//   'reconnect': false,
//   'auto connect': false
// })

// Vue.use(VueSocketio, socketIo("http://localhost:4000"), {
//   'reconnect': false,
//   'auto connect': false 
// });

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // console.log("axios" + localStorage.token)
    if (localStorage.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${ localStorage.token }`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response)
      switch (error.response.status) {
        case false:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.setItem("token", "")
          router.replace({
            path: '/LoginPage',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });

new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: {
    App
  }
})