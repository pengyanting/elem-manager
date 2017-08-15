<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.foodname }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ props.row.shopname }}</span>
            </el-form-item>
            <el-form-item label="食品详情">
              <span>{{ props.row.fooddetail }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="相关活动">
              <span>{{ props.row.activity }}</span>
            </el-form-item>
            <el-form-item label='店铺ID'> 
              <span>{{ props.row.shopid }}</span>
            </el-form-item>
            <el-form-item label="食品特点">
              <span>{{ props.row.characteristic }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="#" prop="id">
      </el-table-column>
      <el-table-column label="食品名称" prop="foodname">
      </el-table-column>
      <el-table-column label="食品种类" prop="category">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

   
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="食品名称：" prop='shopname'>
          <el-input v-model="form.foodname"></el-input>
        </el-form-item>
        <el-form-item label="食品详情：" prop='address'>
          <el-input v-model="form.fooddetail"></el-input>
        </el-form-item>
        <el-form-item label="相关活动" prop='address'>
          <el-input v-model="form.activity"></el-input>
        </el-form-item>
        <el-form-item label="食品种类：" prop='category'>
          <el-cascader :options="options" v-model="form.category"></el-cascader>
        </el-form-item>
        <el-form-item label='食品图片：'>
          <el-upload class="upload-demo" action="http://127.0.0.1:3000/api/common/upload" name='fulAvatar' :multiple='isMultiple' :on-success='shopavatar' :file-list="fileList2" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        
        <el-button type="primary" @click="dialogSpecif=true">添加规格</el-button>
        <el-table :data="specifData" style="width: 100%;margin:20px 0;" border>
          <el-table-column label="规格" prop="name">
          </el-table-column>
          <el-table-column label="价格" prop="price">
          </el-table-column>
          <el-table-column label="包装费" prop="packagefee">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button size="small" type="danger" @click="specifDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    
    <el-dialog title="添加规格" :visible.sync="dialogSpecif">
      <el-form :model="specifForm" ref='specifForm' label-width="80px">
        <el-form-item label="规格:" prop='name'>
          <el-input v-model="specifForm.name"></el-input>
        </el-form-item>
        <el-form-item label='包装费:' prop='packagefee'>
          <el-input-number v-model="specifForm.packagefee" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label='价格:' prop='price'>
          <el-input-number v-model="specifForm.price" :min="1" placeholder='10'></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSpecif = false">取 消</el-button>
        <el-button type="primary" @click="handleSpecif">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { _queryFood, _deleteFood, _foodCategoryQuery, _querySpecif, _delSpecif, _updateFood, _foodSpecif } from '../service/getData'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      form: {
        foodname: '',
        fooddetail: '',
        category: [],
        img: '',
        activity: ''
      },
      specifData: [],
      dialogSpecif: false,
      specifForm: {
        name: '',
        price: 10,
        packagefee: 0
      },
      dialogFormVisible: false,
      options: [],
      isMultiple: false,
      fileList2: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      const vm = this
      _queryFood({ pageIndex: vm.currentPage }, res => {
        if (res.code === 0) {
          vm.tableData = res.result
          vm.total = res.total
        }
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    handleDelete (index, row) {
      const vm = this
      vm.$confirm('确定删除' + row.foodname + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _deleteFood({ foodid: row.id }, res => {
          if (res.code === 0) {
            vm.$message({ message: '删除成功', type: 'success' })
            vm.getList()
          } else {
            vm.$message({ message: '删除失败', type: 'error' })
          }
        })
      })
    },
    handleEdit (index, row) {
      const vm = this
      vm.dialogFormVisible = true
      vm.getCategory(row.shopid)
      vm.form = {
        foodname: row.foodname,
        fooddetail: row.fooddetail,
        activity: row.activity,
        category: [row.category],
        id: row.id,
        img: row.img,
        sigel: row.sigel
      }
      vm.querySpecif(row.id, row.sigel)
      vm.fileList2 = [{ name: '', url: 'http://127.0.0.1:3000' + row.img }]
    },
    querySpecif (foodid, sigel) {
      const vm = this
      _querySpecif({ foodid: foodid, sigel: sigel }, res => {
        if (res.code === 0) {
          vm.specifData = res.result
        }
      })
    },
    getCategory (shopid) {
      const vm = this
      _foodCategoryQuery({shopid: shopid}, res => {
        if (res.code === 0) {
          vm.options = [] // 清空上一次的列表
          res.result.forEach(function (item) {
            vm.options.push({
              value: item.name,
              label: item.name
            })
          })
        } else {
          vm.$message({ message: res.err, type: 'success' })
        }
      })
    },
    shopavatar (response, file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      this.form.img = response.result + '.' + file.name.split('.')[1]
    },
    confirm () {
      let vm = this
      if (vm.specifData.length > 1) {
        vm.form.sigel = 1
      } else {
        vm.form.sigel = 0
      }
      _updateFood(vm.form, res => {
        if (res.code === 1) {
          vm.addSpecif(vm.form.id)
        } else {
          vm.$message({ message: res.err, type: 'error' })
        }
      })
    },
    addSpecif (foodid) {
      const vm = this
      var data = { foodid: foodid, sigel: vm.form.sigel, specif: [] }
      vm.specifData.forEach(function (item) {
        if (item.id === undefined) {
          data.specif.push({
            specifname: item.name,
            price: item.price,
            packagefee: item.packagefee
          })
        }
      })
      data.specif = JSON.stringify(data.specif)
      _foodSpecif(data, res => {
        if (res.code === 0) {
          vm.fileList2 = []
          vm.tableData = []
          vm.dialogFormVisible = false
          vm.$message({ message: '编辑成功', type: 'success' })
          vm.getList()
        }
      })
    },
    handleSpecif () {
      this.specifData.push(this.specifForm)
      this.dialogSpecif = false
    },
    specifDelete (index, row) {
      const vm = this
      if (row.id === undefined) {
        vm.specifData.splice(index, 1)
        vm.$message({ message: '删除成功', type: 'success' })
        return
      }
      _delSpecif({ id: row.id }, res => {
        if (res.code === 0) {
          vm.specifData.splice(index, 1)
          vm.$message({ message: '删除成功', type: 'success' })
        } else {
          vm.$message({ message: res.err, type: 'success' })
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


