<template>
  <el-menu :default-openeds="['1']">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>基础数据</template>
      <el-menu-item index="1-1"><router-link to="/deptManage">部门管理</router-link></el-menu-item>
      <el-menu-item index="1-2">职工管理</el-menu-item>
      <el-menu-item index="1-3">班级管理</el-menu-item>
      <el-menu-item index="1-4">学生管理</el-menu-item>
      <el-menu-item index="1-5">数据导出</el-menu-item>
    </el-submenu>
    <el-menu-item index="2"><i class="el-icon-picture"></i>照片墙</el-menu-item>
    <el-menu-item index="3"><i class="el-icon-message"></i>考勤管理</el-menu-item>
    <el-menu-item index="4"><i class="el-icon-message"></i>公告</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'LeftMenu',
  data: function () {
    return {}
  }
}
</script>

<style scoped>

</style>
