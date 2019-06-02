import Vue from 'vue'
import Router from 'vue-router'

import viewHome from './../views/view_home.vue'
import viewUserPage from './../views/view_userPage.vue'
import viewfollowPage from './../views/view_followPage.vue'
import viewhotPage from './../views/view_hotPage.vue'
import viewDetailItem from './../views/view_detail_item.vue'
import viewOtherUser from './../views/view_otherUser.vue'
import viewMatchPage from './../views/view_matchPage.vue'
import viewChatPage from './../views/view_chatPage.vue'
import viewLogin from './../views/view_login.vue'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [{
      name: 'Home',
      path: '/',
      meta: {
        index: 0,
        requireAuth: true
      }, // meta对象的index用来定义当前路由的层级,由小到大,由低到高
      component: viewHome
    },
    {
      name: 'UserPage',
      path: '/userPage',
      meta: {
        index: 0,
        requireAuth: true
      },
      component: viewUserPage
    },
    {
      name: 'FollowPage',
      path: '/followPage',
      meta: {
        index: 0,
        requireAuth: true
      },
      component: viewfollowPage
    },
    {
      name: 'HotPage',
      path: '/hotPage',
      meta: {
        index: 0,
        requireAuth: true
      },
      component: viewhotPage
    },
    {
      name: 'DetailItem',
      path: '/detailItem',
      meta: {
        index: 1,
        requireAuth: true
      },
      component: viewDetailItem
    },
    {
      name: 'OtherUser',
      path: '/otherUser',
      meta: {
        index: 2,
        requireAuth: true
      },
      component: viewOtherUser
    },
    {
      name: 'MatchPage',
      path: '/matchPage',
      meta: {
        index: 1,
        requireAuth: true
      },
      component: viewMatchPage,
      children: [ //这里就是二级路由的配置
        {
          path: '/toSmallWin',
          name: 'toSmallWin',
          component: viewOtherUser
        },

        {
          name: 'ChatPage',
          path: '/chatPage',
          component: viewChatPage
        },

      ]
    },
    {
      name: 'ChatPage',
      path: '/chatPage',
      meta: {
        index: 2,
        requireAuth: true
      },
      component: viewChatPage
    },
    {
      name: 'LoginPage',
      path: '/LoginPage',
      meta: {
        index: 0
      },
      component: viewLogin
    }
  ]
})

router.beforeEach((to, from, next) => {
  //  console.log(to);
  //  console.log(from);
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限    
    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) { //判断本地是否存在access_token      
      next();
    } else {
      next({
        path: '/LoginPage'
      })
    }
  } else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/LoginPage") {
    if (localStorage.getItem('token')) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});

export default router