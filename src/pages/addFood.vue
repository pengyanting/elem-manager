<template>
    <div class='formBox'>
        <el-form ref="form" :model="form" label-width="110px">
            <el-form-item label="食品名称：" prop='foodname'>
                <el-input v-model="form.foodname"></el-input>
            </el-form-item>
            <el-form-item label='食品种类：' prop='category'>
                <el-select v-model="form.category" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="foodCategory = true">添加食品种类</el-button>
            </el-form-item>
            <el-form-item label="食品详情：" prop='fooddetail'>
                <el-input v-model="form.fooddetail"></el-input>
            </el-form-item>
            <el-form-item label="相关活动：" prop='activity'>
                <el-input v-model="form.activity"></el-input>
            </el-form-item>
            <el-form-item label='食品图片：'>
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
            <el-form-item label="食品特点：" prop='characteristic'>
                <el-checkbox-group v-model="form.characteristic">
                    <el-checkbox label="新品"></el-checkbox>
                    <el-checkbox label="特惠"></el-checkbox>
                    <el-checkbox label="好吃"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="规格：" prop='singel'>
                <el-radio-group v-model="form.sigel">
                    <el-radio label="0">单规格</el-radio>
                    <el-radio label="1">多规格</el-radio>
                </el-radio-group>
            </el-form-item>
            <div  v-if='form.sigel=="0"'>
                <el-form-item label='包装费' prop='packagefee'>
                <el-input-number v-model="form.packagefee" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label='价格' prop='price'>
                <el-input-number v-model="form.price" :min="1" placeholder='10'></el-input-number>
                </el-form-item>
            </div>

            <div  v-else>
                <el-button type="primary" @click="dialogSpecif=true">添加规格</el-button>
                <el-table :data="tableData" style="width: 100%;margin:20px 0;" border>
                    <el-table-column label="规格" prop="specifname">
                    </el-table-column>
                    <el-table-column label="价格" prop="price">
                    </el-table-column>
                    <el-table-column label="包装费" prop="packagefee">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        

        <el-dialog title="添加食品种类" :visible.sync="foodCategory">
            <el-form :model="categoryForm" ref='categoryForm'>
                <el-form-item label="种类名称" prop='name'>
                    <el-input v-model="categoryForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="种类描述" prop='descript'>
                    <el-input v-model="categoryForm.descript" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="foodCategory = false">取 消</el-button>
                <el-button type="primary" @click="addCategory">确 定</el-button>
            </div>
        </el-dialog>

         <el-dialog title="添加规格" :visible.sync="dialogSpecif">
            <el-form :model="specifForm" ref='specifForm' label-width="80px">
                <el-form-item label="规格:" prop='specifname'>
                    <el-input  v-model="specifForm.specifname"></el-input>
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
import { _foodCategoryAdd, _foodCategoryQuery, _foodAdd, _foodSpecif } from '../service/getData'
export default {
  data () {
    return {
      form: {
        foodname: '',
        category: '',
        fooddetail: '',
        shopid: '',
        activity: '',
        characteristic: [],
        sigel: '0',
        img: '',
        packagefee: 0,
        price: 10
      },
      isMultiple: false,
      options: [],
      fileList2: [],
      foodCategory: false,
      categoryForm: {
        name: '',
        descript: '',
        shopid: ''
      },
      shopid: '',
      tableData: [{
        specifname: '默认',
        packagefee: 0,
        price: 10
      }],
      dialogSpecif: false,
      specifForm: {
        specifname: '',
        price: 10,
        packagefee: 0
      }
    }
  },
  mounted () {
    const vm = this
    vm.form.shopid = vm.$route.query.shopid
    vm.shopid = vm.$route.query.shopid
    if (vm.form.shopid === undefined) {
      vm.$confirm('未选择商铺, 是否继续?', '提示', {
        confirmButtonText: '选择商铺',
        cancelButtonText: '继续',
        type: 'warning'
      }).then(() => {
        vm.$router.push({path: '/shopList'})
      })
    }
    vm.getCategory()
  },
  methods: {
    shopavatar (response, file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      this.form.img = response.result + '.' + file.name.split('.')[1]
    },
    onSubmit () {
      const vm = this
      _foodAdd(vm.form, res => {
        if (res.code === 0) {
          console.log(res)
          vm.addSpecif(res.result.insertId)
        }
      })
    },
    handleSpecif () {
      this.tableData.push(this.specifForm)
    // setTimeout(() => vm.$refs['specifForm'].resetFields(), 1000)
      this.dialogSpecif = false
    },
    handleDelete (index, row) {
      this.tableData.splice(index, 1)
    },
    addSpecif (foodid) {
      const vm = this
      var data = { foodid: foodid, sigel: vm.form.sigel }
      if (vm.form.sigel === '0') {
        data.specif = [{ specifname: '', price: vm.form.price, packagefee: vm.form.packagefee }].toString()
        console.log(data.specif)
      } else {
        data.specif = vm.tableData.toString()
      }
      _foodSpecif(data, res => {
        console.log(res)
        vm.$message({ message: '添加成功', type: 'success' })
        vm.$refs['form'].resetFields()
        vm.fileList2 = []
      })
    },
    addCategory () {
      const vm = this
      vm.categoryForm.shopid = vm.form.shopid
      _foodCategoryAdd(vm.categoryForm, res => {
        if (res.code === 1) {
          vm.$message({ message: res.err, type: 'err' })
          return
        }
        vm.$message({ message: '添加成功', type: 'success' })
        vm.foodCategory = false
        vm.$refs['categoryForm'].resetFields()
        vm.getCategory()
      })
    },
    getCategory () {
      const vm = this
      _foodCategoryQuery({shopid: vm.shopid}, res => {
        if (res.code === 0) {
          vm.options = [] // 清空上一次的列表
          res.result.forEach(function (item) {
            vm.options.push({
              value: item.id,
              label: item.name
            })
          })
        } else {
          vm.$message({ message: res.err, type: 'success' })
        }
      })
    }
  }
}
</script>

