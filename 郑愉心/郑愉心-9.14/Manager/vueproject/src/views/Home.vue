<template>
  <div class="home">
    <el-container>
  <el-header>
    <el-row>
      <el-col :span="6">
        <h3>幼儿园管理系统</h3>
      </el-col>
      <el-col :span="12"><p></p></el-col>
      <el-col :span="6"><p>
        adam
      </p>
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px"><left-menu /></el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  <el-footer><p>
    2020幼儿园管理系统
  </p></el-footer>
</el-container>
  </div>
</template>

<script>
import leftMenu from '../components/leftMenu.vue'
export default {
  name: 'Home',
  components: {
    leftMenu
  }
}
</script>
<style scoped>
  .el-header, .el-footer {
    background-color: #0F4E74;
    color: white;
    height: 60px;
  }
  .el-footer {
    text-align: center;
    line-height: 60px;
  }
  .el-header .el-col{
    height: 60px;
    line-height: 60px;
  }
  .el-header .el-col p{
    text-align: right;
  }
  .el-aside {
    background-color: #1570A6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    min-height: 500px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
