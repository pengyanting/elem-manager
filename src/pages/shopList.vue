<template>
    <div>
        <el-table :data="tableData" style="width: 100%" border> 
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="商铺标语">
                            <span>{{ props.row.sign }}</span>
                        </el-form-item>
                        <el-form-item label="店铺分类">
                            <span>{{ props.row.category.replace(',','/') }}</span>
                        </el-form-item>
                        <el-form-item label="起送价">
                            <span>{{ props.row.startprice }}</span>
                        </el-form-item>
                        <el-form-item label="配送费">
                            <span>{{ props.row.deliveryfee }}</span>
                        </el-form-item>
                        <el-form-item label="营业时间">
                            <span>{{ props.row.starttime + ' - ' +props.row.endtime }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="#" prop="id">
            </el-table-column>
            <el-table-column label="商铺名称" prop="shopname">
            </el-table-column>
            <el-table-column label="店铺简介" prop="intro">
            </el-table-column>
            <el-table-column label="操作" >
                <template scope="scope">
                    <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { _getShopList } from '../service/getData'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    getList () {
      const vm = this
      _getShopList({pageIndex: vm.currentPage}, res => {
        if (res.code === 0) {
          vm.tableData = res.result
          vm.total = res.total
        }
      })
    }
  }
}
</script>
<style lang='scss'>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>


