<template>
    <div class='container' ref='container'>
        <el-card class="box-card">
            <div class='title'>后台登录</div>
            <el-form :model="ruleForm2" :rules="rule" ref="ruleForm2" class="demo-ruleForm">
                <el-form-item  prop="name">
                    <el-input type='text' v-model="ruleForm2.name" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item class='btnBox'>
                    <el-button class='btn' type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button class='btn' @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { login } from '../service/getData'
export default {
  data () {
    var checkpass = (rule, value, callback) => {
      if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        name: ''
      },
      rule: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在3到5个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在6到8个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在6到8个字符', trigger: 'blue' },
          { validator: checkpass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$refs.container.style.height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    submitForm (formName) {
      var vm = this
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          login({ name: vm.ruleForm2.name, password: vm.ruleForm2.pass }, res => {
            if (res.data.code === 0) {
              vm.$message({
                message: '登录成功',
                type: 'success'
              })
              vm.$router.push({ path: '/' })
            } else {
              vm.$message({
                message: res.data.err,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/common.scss';
.container {
    background: $color;
    width: 100%;
    height: 100%;
}
.box-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .title{
        font-size:20px;
        margin-bottom: 20px;
        text-align: center;
    }
    .el-form-item{
        margin-bottom:20px;
    }
    .btnBox{
       .btn{
           width: 100%;
           height: 35px;
           margin-bottom:10px;
       }
    }
    .el-button+.el-button{
        margin-left:0;
    }
}
</style>

