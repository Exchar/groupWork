<template>
  <el-menu>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-user"></i>基础数据</template>
      <el-menu-item-group>
        <el-menu-item index="1-1"><i class="el-icon-s-custom"></i>职工管理</el-menu-item>
        <el-menu-item index="1-2"><i class="el-icon-s-check"></i><router-link to="/DeptManage">部门管理</router-link></el-menu-item>
        <el-menu-item index="1-3"><i class="el-icon-s-data"></i>学生管理</el-menu-item>
        <el-menu-item index="1-4"><i class="el-icon-share"></i>数据导出</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2"><i class="el-icon-s-promotion"></i>照片墙</el-menu-item>
    <el-menu-item index="3"><i class="el-icon-s-order"></i>考勤管理</el-menu-item>
    <el-menu-item index="4"><i class="el-icon-bell"></i>公告管理</el-menu-item>
  </el-menu>
</template>
<script>
  export default {
    name: 'leftMenu'
  }
</script>
<style scoped>
  a{
    text-decoration: none;
  }
</style>
