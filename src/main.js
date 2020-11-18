import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/base.css";
import "@/assets/styles/el-reset.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

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
    next()
  }else {//没有token
    if(to.path==="/login"){
      next()
      
    }else{//访问的如果不是登入页，就要跳转到登入页
      next({path:"/login"})
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
