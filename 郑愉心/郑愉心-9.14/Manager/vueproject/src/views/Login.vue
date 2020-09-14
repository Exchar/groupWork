<template>
  <div>
    <el-card class="box-card">
      <h1>登录</h1>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data: function () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        username: '',
        pwd: ''
      }
    }
  },
  methods: {
    submitForm () {
      if (this.formLabelAlign.username.length === 0) {
        this.$message({
          showClose: true,
          message: '请输入用户名',
          type: 'warning'
        })
      } else if (this.formLabelAlign.pwd.length === 0) {
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'warning'
        })
      } else {
        this.$axios.post('/api/userLogin', { userName: this.formLabelAlign.username, Pwd: this.formLabelAlign.pwd })
          .then((data) => {
            if (data.data.message === '登录成功') {
              this.$router.push('home')
            } else {
              this.$alert(data.data.message)
              console.log(data.data)
            }
          }).catch((err) => {
            console.log(err)
            this.$message({
              showClose: true,
              message: '请求出错，请联系管理员',
              type: 'error'
            })
          })
      }
    }
  }
}
</script>
<style scoped>
.box-card {
  width: 480px;
  height: 250px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
}

</style>
