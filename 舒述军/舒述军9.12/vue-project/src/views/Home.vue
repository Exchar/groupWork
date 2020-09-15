<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="6">
            <h3>幼儿园管理系统</h3>
          </el-col>
          <el-col :span="12"></el-col>
          <el-col :span="6">
            <p>doubleyong</p>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <LeftMenu/>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer>
        <p>2020 幼儿园管理系统</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from '../components/LeftMenu'
export default {
  name: 'Home',
  components: {
    LeftMenu
  }
}
</script>
<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  height: 60px;
}
.el-header .el-col {
  height: 60px;
  line-height: 60px;
}
.el-header .el-col p {
  text-align: right;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  min-height: 600px;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}
.el-footer {
  text-align: center;
  line-height: 60px;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>
