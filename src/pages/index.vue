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
   
  <section ref='menu'  class='menu'>
    <el-row>
      <el-col :span='4'  class='nav'>
        <div>
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  @select='getIndexMenu'>
            <el-submenu index="用户">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">用户</span>
              </template>
              <router-link to='/userList'><el-menu-item index="用户列表">用户列表</el-menu-item></router-link>
              <router-link to='/adminList'><el-menu-item index="管理员列表">管理员列表</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="商铺">
              <template slot='title'>
                <i class="el-icon-menu"></i>
                <span slot="title">商铺</span>
              </template>
              <router-link to='/shopList'><el-menu-item index="商铺列表">商铺列表</el-menu-item></router-link>
              <router-link to='/addShop'><el-menu-item index="添加商铺">添加商铺</el-menu-item></router-link>
            </el-submenu>
            <el-submenu index="食品">
              <template slot='title'>
                <i class="el-icon-menu"></i>
                <span slot="title">食品</span>
              </template>
              <el-menu-item index="食品列表">食品列表</el-menu-item>
              <el-menu-item index="添加食品">添加食品</el-menu-item>
            </el-submenu>
            <el-menu-item index="设置">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span='20' class='contentInner'>
        <el-row :gutter="24" style='margin:0;'>
          <el-col :span='24'>
            <div class='navBar'>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <div v-if='breadcrumb.length>0'>
                  <el-breadcrumb-item>{{breadcrumb[0]}}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{breadcrumb[1]}}</el-breadcrumb-item>
                </div>
              </el-breadcrumb>
            </div>
          </el-col>
          <el-col>
            <div style='width:100%;'>
              <router-view></router-view>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Collapse: '',
      currentPathName: '',
      breadcrumb: []
    }
  },
  methods: {
    handleCommand () {},
    isCollapse () {},
    handleOpen () {},
    handleClose () {},
    getIndexMenu (index, indexPath) {
      this.breadcrumb = indexPath
    }
  },
  mounted () {
    this.$refs.menu.style.height = document.documentElement.clientHeight - 50 + 'px'
  },
  watch: {
    '$route' (to, from) {
      this.currentPathName = to.name
      localStorage.setItem('title', to.name)
    }
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
.menu{
  overflow: auto;
}
.menu .el-row{
  height: 100%;
}
.menu .nav{
  height: 100%;
  &>div{
    width: auto;
    height: 100%;
    background: #FBFBFB;
    overflow: auto;
  }
}
.contentInner{
  height: 100%;
  overflow: auto;
}
.navBar{
  height: 50px;
  border-bottom: 1px solid #f2f2f2;
  box-sizing: border-box;
  display:flex;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 20px; 
  .el-breadcrumb{
    width: 100%;
  }
}
</style>
