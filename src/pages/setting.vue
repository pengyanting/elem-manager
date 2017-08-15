<template>
    <div>
        <el-card class="box-card">
            <div  class="text item"><span>管理员姓名：</span>{{info.name}}</div>
            <div  class="text item"><span>注册地址：</span>{{info.address}}</div>
            <div  class="text item"><span>管理员权限：</span>{{info.auth?'超级管理员':'普通管理员'}}</div>
            <div  class="text item"><span>管理员ID：</span>{{info.id}}</div>
        </el-card>
    </div>
</template>
<script>
import { _getAdmin } from '../service/getData'
export default {
  data () {
    return {
      info: {}
    }
  },
  created () {
    this.getAdmin()
  },
  methods: {
    getAdmin () {
      let vm = this
      let id = JSON.parse(localStorage.getItem('info')).id
      _getAdmin({ id: id }, res => {
        if (res.code === 0) {
          vm.info = res.result[0]
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.box-card{
    width: 50%;
}
.item{
    height: 40px;
    line-height: 40px;
    display: flex;
    span{
       display: inline-block;
       text-align: right;
       width: 20%;
       margin-right: 10px;
    }
}

</style>


