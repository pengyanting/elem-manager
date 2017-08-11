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
                    <router-link :to='{path:"/addFood",query:{shopid:scope.row.id}}'><el-button size="small" >添加食品</el-button></router-link>
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
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="商铺名称：" prop='shopname'>
                    <el-input v-model="form.shopname"></el-input>
                </el-form-item>
                <el-form-item label="详细地址：" prop='address'>
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：" prop='phone'>
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="店铺简介：" prop='intro'>
                    <el-input v-model="form.intro"></el-input>
                </el-form-item>
                <el-form-item label="商铺标语：" prop='sign'>
                    <el-input v-model="form.sign"></el-input>
                </el-form-item>
                <el-form-item label="店铺分类：" prop='category'>
                    <el-cascader :options="options" v-model="form.category"></el-cascader>
                </el-form-item>
                <el-form-item label="店铺特点：" prop='characteristic'>
                    <el-checkbox-group v-model="form.characteristic">
                        <el-checkbox label="品牌保证"></el-checkbox>
                        <el-checkbox label="蜂鸟专送"></el-checkbox>
                        <el-checkbox label="新店开张"></el-checkbox>
                        <el-checkbox label="外卖保"></el-checkbox>
                        <el-checkbox label="准时达"></el-checkbox>
                        <el-checkbox label="开发票"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label='配送费：' prop='deliveryfee'>
                    <el-input-number v-model="form.deliveryfee" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label='起送价：' prop='startprice'>
                    <el-input-number v-model="form.startprice"  :min="1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label='店铺图片：'>
                    <el-upload class="upload-demo" 
                    action="http://127.0.0.1:3000/api/common/upload" 
                    name='fulAvatar'
                    :multiple='isMultiple'
                    :on-success='shopavatar'
                    :file-list="fileList2" 
                    list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>  
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { _getShopList, _delShop, _getCategory, _editShop } from '../service/getData'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      form: {
        shopname: '',
        address: '',
        phone: '',
        intro: '',
        sign: '',
        category: [],
        characteristic: [],
        deliveryfee: '',
        startprice: '',
        shopavatar: ''
      },
      fileList2: [],
      options: [],
      isMultiple: false,
      dialogFormVisible: false
    }
  },
  created () {
    this.getList()
    this.getCatogory()
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
    },
    shopavatar (response, file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      this.form.shopavatar = response.result + '.' + file.name.split('.')[1]
    },
    getCatogory () {
      const vm = this
      _getCategory({}, res => {
        const result = res.data.result
        result.forEach(function (item, value) {
          if (!item.sub_categories) {
            return
          }
          var newobj = {
            label: item.name,
            value: item.name,
            children: []
          }
          item.sub_categories.forEach(function (subitem, index) {
            if (index === 0) {
              return
            }
            newobj.children.push({
              label: subitem.name,
              value: subitem.name
            })
          })
          vm.options.push(newobj)
        })
      })
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.form = row
      if (typeof this.form.category === 'string') {
        this.form.category = this.form.category.split(',')
      }
      if (typeof this.form.characteristic === 'string') {
        this.form.characteristic = this.form.characteristic.split(',')
      }
      this.fileList2 = [{ name: '', url: 'http://127.0.0.1:3000' + this.form.shopavatar }]
    },
    handleDelete (index, row) {
      const vm = this
      _delShop({id: row.id}, res => {
        if (res.code === 0) {
          vm.$message({ message: '删除成功', type: 'success' })
          vm.getList()
        } else {
          vm.$message({ message: res.err, type: 'error' })
        }
      })
    },
    confirm () {
      const vm = this
      _editShop(vm.form, res => {
        if (res.code === 0) {
          vm.dialogFormVisible = false
          vm.$refs['form'].resetFields()
          vm.$message({ message: '修改成功', type: 'success' })
          vm.fileList2 = []
          vm.getList()
        } else {
          vm.$message({ message: res.err, type: 'error' })
        }
      })
    }
  },
  computed: {

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


