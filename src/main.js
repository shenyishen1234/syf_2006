import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入全局css和element-rest
import "@/assets/styles/base.css";
import "@/assets/styles/el-reset.css";
//引入 element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入 iconfont
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);

//按需引入

// import {Carousel,CarouselItem} from "element-ui"//手动引入组件

//注册到全局

// Vue.component('el-carousel',Carousel)
// Vue.component('el-carousel-item',CarouselItem)

//路由前置钩子（导航守卫）
router.beforeEach((to,from,next)=>{
  //用户登入之后，localStorage中有token
  let token = localStorage.getItem("syf2006-token")
  // console.log(to);
  if(token){
    //如果是注册页面或者是登入页面，直接放行
    if(store.state.menuList.length == 0){
      //说明没有用户路由，触发action获取用户路由
      store.dispatch('FETCH_MENULIST')
      .then(()=>{
        next({path:to.path})//这里要注意，next里面要传参数即要进入的页面的路由信息，国为next传参数后，当前要进入的路由会被废止，转而进入参数对应的路由，虽然是同一个路由，这么做主要是为了确保addRoutes生效了
      })
    }else{
      next()
    }
    next()
  }else {//没有token
    if(to.path==="/login"){
      next()
      
    }else{//访问的如果不是登入页，就要跳转到登入页
      next({path:"/login"})
    }
  }
})

import "./utils/recursionRoutes"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
