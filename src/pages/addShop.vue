<template>
    <div class='formBox'>
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
                <el-input-number v-model="form.deliveryfee" @change="handleChange" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label='起送价：' prop='startprice'>
                <el-input-number v-model="form.startprice" @change="handleChange" :min="1" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="营业时间：">
                <el-col :span='11'>
                    <el-form-item  prop='starttime'>
                        <el-time-select placeholder="起始时间" v-model="form.starttime" :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '18:30'
                            }">
                        </el-time-select>
                    </el-form-item>
                </el-col>
                <el-col :span='2'>-</el-col>
                <el-col :span='11'>
                    <el-form-item prop='endtime'>
                        <el-time-select placeholder="结束时间" v-model="form.endtime" :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '23:30',
                            minTime: form.startTime
                            }">
                        </el-time-select>
                    </el-form-item>
                </el-col>
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
            <el-form-item label='营业执照：'>
                <el-upload class="upload-demo" 
                   action="http://127.0.0.1:3000/api/common/upload" 
                   name='fulAvatar'
                   :on-success='businesslicense'
                   :file-list="fileList2" 
                   list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>   
            <el-form-item label='餐饮服务许可证：'>
                <el-upload class="upload-demo"
                   action="http://127.0.0.1:3000/api/common/upload" 
                   name='fulAvatar'
                   :on-success='servicelicense'
                   :file-list="fileList2" 
                   list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>       
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即添加</el-button>
                <el-button @click='resetForm()'>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { _getCategory, _addShop } from '../service/getData'
export default {
  data () {
    return {
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
        starttime: '',
        endtime: '',
        shopavatar: '',
        businesslicense: '',
        servicelicense: ''
      },
      fileList2: [],
      options: [],
      isMultiple: false
    }
  },
  created () {
    this.getCatogory()
  },
  methods: {
    handleChange () {},
    onSubmit () {
      const vm = this
      _addShop(this.form, res => {
        if (res.data.code === 0) {
          vm.$message({ message: '添加成功', type: 'success' })
          vm.resetForm()
        } else {
          vm.$message({ message: res.data.err, type: 'error' })
        }
      })
    },
    shopavatar (response, file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      this.form.shopavatar = response.result + '.' + file.name.split('.')[1]
    },
    businesslicense (response, file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      this.form.businesslicense = response.result + '.' + file.name.split('.')[1]
    },
    servicelicense (response, file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }
      this.form.servicelicense = response.result + '.' + file.name.split('.')[1]
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
    resetForm () {
      this.$refs['form'].resetFields()
      this.fileList2 = []
    }
  }
}
</script>

