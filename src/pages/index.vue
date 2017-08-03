<template>
  <div>
    <header>
      <el-row>
        <el-col :span="12">
          <div class="">
            后台管理系统
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right">
            <img src="../assets/images/my-head.png" width='35' height='35' alt="">
            <span>张三</span>
            <span class='line'>|</span>
            <span>系统管理员</span>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">首页</el-dropdown-item>
                <el-dropdown-item command="b">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </header>
    <section>
      <el-row>
        <el-col :span='4'>
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="Collapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">用户</span>
              </template>
              <el-menu-item index="1-3">用户列表</el-menu-item>
              <el-menu-item index="1-3">管理员列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot='title'>
                <i class="el-icon-menu"></i>
                <span slot="title">商铺</span>
              </template>
              <el-menu-item index="1-3">商铺列表</el-menu-item>
              <el-menu-item index="1-3">添加商铺</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot='title'>
                <i class="el-icon-menu"></i>
                <span slot="title">食品</span>
              </template>
              <el-menu-item index="1-3">食品列表</el-menu-item>
              <el-menu-item index="1-3">添加食品</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span='20'></el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Collapse: ''
    }
  },
  methods: {
    handleCommand () {},
    isCollapse () {},
    handleOpen () {},
    handleClose () {}
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/common.scss';
header {
  width: 100%;
  height: 50px;
  background: $color;
  color: #fff;
  line-height: 50px;
  padding: 0 20px;
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img {
      margin-right: 10px;
    }
    span {
      font-size: 14px;
    }
    .line {
      margin: 0 5px;
    }
  }
  .el-icon-caret-bottom {
    color: #fff;
    margin-left: 5px;
    cursor: pointer;
  }
}
.el-menu-vertical-demo{
  background: #FBFBFB;
}
</style>
