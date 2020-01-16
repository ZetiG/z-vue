<template>
  <div id="poster">
  <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" class="login-container">
    <h3 class="login_title">系统登录</h3>
      <el-form-item label="登录账号:" prop="username">
        <el-input style="width:70%" v-model="loginForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="登录密码:" prop="password">
        <el-input type="password" style="width:70%" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="validate">
        <el-input style="width:40%; padding-left: 15px" v-model="loginForm.validate" autocomplete="off" placeholder="请输入验证码"></el-input>
        <img :src="codeImg" @click="getImgCode" alt="图片加载失败"/>
      </el-form-item>
      <el-form-item style="padding-left: 23%; padding-top: 3%">
        <el-button round type="primary" @click="login('loginForm')">登录账号</el-button>
        <el-button round @click="resetForm('loginForm')">重新输入</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>
<script>

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        validate: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        validate: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4个字符', trigger: 'blur' }
        ]
      },
      response: {},
      codeImg: '' // 图片验证码
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/user/login',
            params: {
              username: this.loginForm.username,
              password: this.loginForm.password
            }
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.response = res
            if (res.data.code === 1) {
              this.$router.push({
                path: '/index'
              })
            }
          }).catch(err => {
            console.log('www', err)
            // this.$message.error(err.data.message)
            this.$message({
              type: 'error',
              message: err.data.msg
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getImgCode () {
      this.$axios.get('/proof/captcha', {
        responseType: 'arraybuffer'
      })
        .then(res => {
          this.codeImg = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        })
        .catch(() => {
          this.$message.error('获取验证码失败！')
        })
    }
  }
}
</script>

<style>
  #poster {
    background: url("../assets/login.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 450px;
    padding: 35px 35px 45px 35px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac9a4;
    background: rgba(48,48,48, 0.8);
  }
  .login_title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #505458;
    font-size: x-large;
  }
  /*.input_style{*/
  /*  */
  /*}*/
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
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
