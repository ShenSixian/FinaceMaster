<template>
  <div id="app">
    <el-form label-width="60px" class="loginForm">
      <h2 class="center">{{login}}</h2>
          <el-form-item label="用户名" prop="username" auto-complete="off">
            <el-input ID="user" v-model="user" type="text" placeholder="请输入用户名"></el-input>
         </el-form-item>
          <el-form-item label="密码" auto-complete="off">
            <el-input ID="password" v-model="pwd"  type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:90%" @click="btnLogin">登陆</el-button>
          </el-form-item>
    </el-form> 
  </div>
</template>


<script>
import $ from 'jquery'
export default {
  name: 'login',
  data () {
    return {
      login: '登录',
      user: '',
      pwd: '',
      msg: ''
    }
  },
  methods: {
    btnLogin: function () {
      // this.$router.push({ path: 'MyShares' })
      var _this = this
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8888/ajax/login',
        data: {'username': this.user, 'password': this.pwd},
        dataType: 'TEXT',
        success: function (data) {
          if (data === 'OK') {
            // _this.$router.push({ path: 'Test' })
            // _this.$router.push({ path: 'MyShares' })
            // _this.$router.push({ path: 'Share' })
            // _this.$router.push({ path: 'AMarket' })
            _this.$router.push({ path: 'Register' })
          } else {
            alert('error')
            this.msg = 'ERROR'
          }
        }
      })
    }
  }
}
</script>


<style>  
.el-row {  
    margin-bottom: 20px;  
    &:last-child {  
      margin-bottom: 0;  
    }  
  }
.center {
  text-align: center;
}
.loginForm {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 20px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>
