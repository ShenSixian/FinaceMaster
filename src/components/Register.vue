<template>
  <div>
    <el-form class="registerForm">
      <h2 class="center">{{register}}</h2>
        <el-form label-width="70px">
          <el-form-item label="用户名" prop="username" auto-complete="off">
            <el-input ID="user" v-model="user" type="text" placeholder="请输入用户名"></el-input>
         </el-form-item>
          <el-form-item label="密码" auto-complete="off">
            <el-input ID="password" v-model="pwd"  type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" auto-complete="off">
            <el-input ID="password" v-model="repwd"  type="password" placeholder="请再次输入密码"></el-input>
          </el-form-item>
        </el-form>
        <el-form label-width="30px">
          <el-form-item>
            <el-button type="primary" style="width:45%" @click="submit">{{register}}</el-button>
            <el-button type="primary" style="width:45%" @click="empty">重置</el-button>
          </el-form-item>
        </el-form>
            
    </el-form> 
  </div>
</template>


<script>
import $ from 'jquery'
export default {
  name: 'register',
  data () {
    return {
      register: '注册',
      user: '',
      pwd: '',
      repwd: ''
    }
  },
  methods: {
    empty: function () {
      this.user = ''
      this.pwd = ''
      this.repwd = ''
    },
    submit: function () {
      if (this.pwd === '' || this.user === '') {
        alert('用户名密码不能为空')
        this.empty()
      } else if (this.pwd !== this.repwd) {
        alert('两次密码输入不一致')
        this.empty()
      } else {
        var _this = this
        $.ajax({
          type: 'GET',
          url: 'http://localhost:8888/ajax/register',
          data: {'username': this.user, 'password': this.pwd},
          dataType: 'JSON',
          success: function (data) {
            if (data['status'] === 'OK') {
              alert('注册成功！')
              _this.$router.push({ path: 'MyShares' })
            } else if (data['status'] === 'REREGISTER') {
              alert('该用户已存在！')
              _this.empty()
            } else {
              alert('注册失败！')
              _this.empty()
            }
          }
        })
      }
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
.registerForm {
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
