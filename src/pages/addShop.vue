<template>
    <div class='formBox'>
        <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="商铺名称：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="详细地址：">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="店铺简介：">
                <el-input v-model="form.intro"></el-input>
            </el-form-item>
            <el-form-item label="商铺标语：">
                <el-input v-model="form.sign"></el-input>
            </el-form-item>
            <el-form-item label="店铺分类：">
                <el-cascader :options="options" v-model="form.category"></el-cascader>
            </el-form-item>
            <el-form-item label="店铺特点：">
                <el-select v-model="form.characteristic" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='配送费：'>
                <el-input-number v-model="form.deliveryfee" @change="handleChange" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label='起送价：'>
                <el-input-number v-model="form.startprice" @change="handleChange" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="营业时间：">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.satrttime" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.endtime" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label='店铺图片：'>
                <el-upload class="upload-demo" 
                   action="http://127.0.0.1:3000/common/upload" 
                   name='fulAvatar'
                   :on-success='shopavatar'
                   :file-list="fileList2" 
                   list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>  
            <el-form-item label='营业执照：'>
                <el-upload class="upload-demo" 
                   action="http://127.0.0.1:3000/common/upload" 
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
                   action="http://127.0.0.1:3000/common/upload" 
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
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        shopavatar: '',
        businesslicense: '',
        servicelicense: ''
      },
      deliveryfee: 0,
      startprice: 0,
      fileList2: [],
      fileList: [],
      selectedOptions: ['zujian', 'data', 'tag'],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }
  },
  methods: {
    handleChange () {},
    onSubmit () {
      console.log(this.form)
    },
    shopavatar (response, file, fileList) {
      this.form.shopavatar = response.result + '.' + file.name.split('.')[1]
    },
    businesslicense (response, file, fileList) {
      this.form.businesslicense = response.result + '.' + file.name.split('.')[1]
    },
    servicelicense (response, file, fileList) {
      this.form.servicelicense = response.result + '.' + file.name.split('.')[1]
    }
  }
}
</script>

