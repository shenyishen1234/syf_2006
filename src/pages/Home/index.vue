<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200">
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :router="true"
          :collapse="isCollapse"
        >
          <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部栏 -->
        <el-header style="height: 85px">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"
              ><div class="grid-content">
                <i
                  class="iconfont icon-icon-"
                  @click="isCollapse = !isCollapse"
                ></i></div
            ></el-col>
            <el-col :span="6"
              ><div class="grid-content">万锋管理系统</div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content">
                <el-avatar
                  :size="40"
                  fit="fit"
                  src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIzXDib7zrmdYxdEQpYk85B26DZAJS6PUJC7ic4Fydibdz9L2gU3hloPcibuyo0xAFztxqPbgdVWp1zpQ/132"
                ></el-avatar>
                <span>欢迎您:</span>
                <b class="nickname">{{ userInfo.nickname }}</b>
                <span class="quit" @click="quit">退出</span>
              </div></el-col
            >
          </el-row>
        </el-header>
        <!-- main内容 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:crumb.path}" v-for="crumb in crumbs" :key="crumb.id">
              {{crumb.meta.name}}
            </el-breadcrumb-item>

          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import { getloginlog } from "@/api";
import { mapState } from "vuex";
import subMenu from "../../components/subMenu.vue";
// import subMenu from '../../components/subMenu'
export default {
  // components:{
  //   subMenu
  // },

  computed: {
    ...mapState(["userInfo", "menuList","crumbs"]),
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      //退出登入
      //1、清除token和userInfo
      //2、跳转到登入页

      localStorage.removeItem("syf2006-token");
      localStorage.removeItem("syf2006-userInfo");
      this.$router.push("/login");
      //刷新页面
      window.location.reload();
    },
  },
  mounted() {
    // getloginlog().then((res) => {
    //   console.log(res);
    // });
  },
};
</script>

<style>
.icon-icon- {
  font-size: 50px !important;
  color: hotpink;
  cursor: pointer;
  padding-right: 100px;
  margin-right: 100px;
}
.quit {
  cursor: pointer;
  color: hotpink;
}

.el-header,
.el-footer {
  background: linear-gradient(135deg, #4c67ff, #5635df);
  color: #333;
  text-align: center;
  line-height: 60px;
  padding-bottom: 85px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-avatar {
  vertical-align: middle;
  margin-right: 10px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 20px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-row {
  margin-bottom: 20px;
  background: aqua;
}

.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 40px;
  height: 65px;
}

.row-bg {
  padding: 10px 0;
  background: linear-gradient(135deg, #4c67ff, #5635df);
}
</style>
