<template>
    <div>
        <el-table :data="tableData" style="width: 100%"  border height='440'>
            <el-table-column prop="id" label="id" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { getUser } from '../service/getData'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 0
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.getUsers()
    },
    getUsers () {
      var vm = this
      getUser({pageIndex: vm.currentPage}, res => {
        if (res.data.code === 0) {
          vm.tableData = res.data.result
          vm.total = res.data.total
        }
      })
    }
  }
}
</script>



