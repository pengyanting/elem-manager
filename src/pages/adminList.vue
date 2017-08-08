<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border height='440'>
      <el-table-column prop="id" label="id" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="auth" :formatter='formdataAuth' label="权限">
      </el-table-column>
      <el-table-column prop="address" label="电话">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getAdmin } from '../service/getData'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 0
    }
  },
  created () {
    this.getAdmins()
  },
  methods: {
    handleCurrentChange () {},
    getAdmins () {
      var vm = this
      getAdmin({pageIndex: vm.currentPage}, res => {
        if (res.data.code === 0) {
          vm.tableData = res.data.result
          vm.total = res.data.total
        }
      })
    },
    formdataAuth (row, column, cellValue) {
      var auth = row.auth
      if (auth === '') {
        auth = '普通管理员'
      }
      return auth
    }
  }
}
</script>

