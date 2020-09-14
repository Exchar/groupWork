<template>
  <div>
    <el-card class="box-card">
      <h1>登录</h1>
      <p><el-input placeholder="请输入用户名" v-model="user.username" /></p>
      <p><el-input placeholder="请输入密码" v-model="user.password" type="password" /></p>
      <p><el-button type="primary" @click="userLogin" :plain="true">登录</el-button></p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    userLogin () {
      if (this.user.username.length === 0) {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
      } else if (this.user.password.length === 0) {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
      } else {
        // 发起一个请求到服务器
        this.$axios.post('/api/userLogin', { UserName: this.user.username, Pwd: this.user.password })
          .then((data) => {
            console.log(data.data)
          }).catch((err) => {
            console.log(err)
            this.$message.error('请求出错了，请联系管理员')
          })
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 480px;
  height: 350px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.box-card h1{
  margin-top: 50px;
}
.box-card p{
  margin-top: 20px;
}
</style>
