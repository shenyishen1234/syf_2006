<template>
  <div class="login-page">
    <video src="../../img/bg_video.d2d602a9.mp4" autoplay loop muted></video>

    <div class="push">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <h3 class="title">千峰教育系统</h3>
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off" @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  //登入逻辑的实现
  //1、收集用户输入的username&password传递给后端
  //2、登入通过后，将后端 返回的token存到本地
  //3、每次请求的时候，携带token到请求头authorization
  //4、展示token校验正确的数据
  //5、校验不通过，跳转到登入页

import {login} from "@/api"
import {mapMutations} from "vuex"
export default {
  data() {
    //jsDoc的注释方式
    /**
     * @param {Object} rule 就是一个表单验证对象
     * @param {String} value 输入值
     * @param {Function} callback 校验
     */
    var validateUsername = (rule, value, callback) => {
      //用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
      if (!value) {
        callback("4到16位（字母，数字，下划线，减号）");
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    submitForm(formName) {
      
      // console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        if (valid) {//代表本地校验通过
        //打开登入加载动画
        const loading =this.$loading({
          lock: true,
          text: '正在登入...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        let {username,password} = this.loginForm
        //发送登入请求
          login(username,password)
          .then(res=>{
            
            //服务器响应，关闭loading动画

            loading.close()

            if(res.data.state){//用户名密码正确
              this.$message.success('登入成功')
              localStorage.setItem('syf2006-token',res.data.token)
              localStorage.setItem('syf2006-userInfo',JSON.stringify(res.data.userInfo))
              //更改vuex中state['userInfo']的值
              this.SET_USERINFO(res.data.userInfo)
              //跳转到主页
              this.$router.push("/Welcome")
            }else{
              //用户中或者密码错误
              
              this.$message.error('用户名或密码错误');
            
            }
          })
          .catch(err=>{
            console.log(err);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.push {
  width: 25rem;
  height: 30rem;
  z-index: 10;
  position: absolute;
  left: 70%;
  top: 50%;
  background: rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px 0 15px 15px;
}

.title {
  width: 400px;
  text-align: center;
  font-size: 2rem;
  margin-top: 50px;
  margin-bottom: 50px;
  color: white;
}

.el-button {
  width: 250px;
  background: linear-gradient(90deg, #1596fb, #002dff) !important;
}
.el-form {
  width: 350px;
}

</style>
