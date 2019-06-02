import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tipShow: false,
    tip: '',
    userName: '',
    userCreatePage: false,
    opacityBg: false,
    uploadType: "",
    musicUrl: "",
    ReloadPage: false,
    ShowFooter: true,
    SHOWSmallPage: false,
    createItemPage: false,
    userRecommend: []
  },
  mutations: {
    /*  提示弹框  */
    AlertShow(state, show) {
      state.tipShow = show
      setTimeout(() => {
        state.tipShow = false
      }, 1500);
    },

    AlertTip(state, tip) {
      state.tip = tip
    },

    // 推荐用户名数组
    SETuserRecommend(state, arr) {
      state.userRecommend = arr
    },

    // 用户名
    SETuserName(state, name) {
      state.userName = name
    },

    // 用户上传面板
    SHOWuserCreatePage(state, show) {
      state.userCreatePage = show
    },

// 上传成功后刷新页面
ReloadPage(state, reload ) {
  state.ReloadPage = reload 
},

    // 用户创建标签
    SHOWcreateItemPage(state, show) {
      state.createItemPage = show
    },

    // 全局背景遮罩
    SHOWopacityBg(state, show) {
      state.opacityBg = show
    },

    // 频道内容上传
    SETuploadType(state, type) {
      state.uploadType = type
    },

    // 音乐播放链接
    SETmusicUrl(state, url) {
      state.musicUrl = url
    },

    // 底部导航
    SHOWFooter(state, show) {
      state.ShowFooter = show
    },

    // 匹配页小窗口
    SHOWSmallPage(state, show) {
      state.SHOWSmallPage = show
    }
  },
  actions: {

  }
})

export default store