<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="6"><h3>小小幼儿园管理系统</h3></el-col>
        <el-col :span="12">
          <p></p>
        </el-col>
        <el-col :span="6"><p>Exchar</p></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <leftMenu />
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
  import leftMenu from '../components/leftMenu'
  export default {
    name: 'index',
    components: {
      leftMenu
    }
  }
</script>
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .el-header, .el-footer {
    background-color: #0F4E74;
    color: white;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .el-header .el-col p{
    height: 60px;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    min-height: 550px;
  }
</style>
