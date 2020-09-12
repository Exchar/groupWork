<template>
  <div id="app" >
    <el-card class="box-card">
      <el-main>
        <img src="../assets/logo.png" alt="">
        <h2>iking学生管理系统</h2>
        <div class="loginForm">
          <el-form
            ref="form"
            :model="loginForm"
            label-width="80px"
            size="mini"
            :rules="loginRules"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="loginForm.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input type="password" v-model="loginForm.pwd" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit" placeholder="请输入密码">登录</el-button>
          </el-form>
        </div>
      </el-main>
    </el-card>
    <div id="index"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: function () {
    return {
      loginForm: {
        name: '',
        pwd: ''
      },
      loginRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '密码必须包含大小写字母和数字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.loginForm.name.length > 0 && this.loginForm.pwd.length > 0) {
        this.$axios.post('/api/confirmUser', {
          username: this.loginForm.name,
          pwd: this.loginForm.pwd
        }).then((res) => {
          console.log(res)
          if (res.data.code === 200 && res.data.data.length && res.data.data.length > 0) {
            // 登录成功
            this.$router.push({ path: 'home' })
          } else {
            this.$message('用户名或密码错误')
          }
        }).catch((err) => {
          console.log(err)
          this.$message.error(' 请求出错，请联系管理员')
        })
      }
    }
  }
}
</script>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .box-card{
    width: 480px;
    margin: auto;
  }
  h2 {
    text-align: center;
  }
</style>
