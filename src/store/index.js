import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let userInfo = localStorage.getItem("syf2006-userInfo")||{}
//刷新页面会丢失用户信息，所以要从本地localStorage中取
userInfo = JSON.parse(userInfo)

export default new Vuex.Store({
  state: {
    userInfo
  },
  mutations: {
    //更改userInfo
    SET_USERINFO(state,payload){
      state.userInfo = payload
    }
  },
  actions: {

  },
  modules: {

  }
});
