<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png" />
        <div class="name">
          <div class="title">KILO</div>
          <div class="tips">kilo安全管理平台</div>
        </div>
      </div>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="ruleForm.code" auto-complete="off" placeholder="请输入图片验证码" style="width: 65%"> </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm">立即{{ type === 'login' ? '登录' : '注册' }}</el-button>
          <!-- <el-button plain @click="resetForm">重置</el-button> -->
          <el-button plain type="text" @click="type = type === 'login' ? 'register' : 'login'">{{ type === 'login' ? '注册' : '登录' }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'
// import md5 from 'js-md5'
import { reactive, ref, toRefs } from 'vue'
import { commonStore } from '@/store'
import { ElMessage } from 'element-plus'
import { router } from '@/router'
import JSEncrypt from './jsencrypt.min'
export default {
  name: 'Login2',
  setup() {
    console.log('🚀 ~ JSEncrypt:', JSEncrypt)
    const loginForm = ref(null)
    const state = reactive({
      type: 'login',
      ruleForm: {
        username: '',
        password: '',
        loginType: 'username',
        code: ''
      },
      rules: {
        username: [
          {
            required: 'true',
            message: '账户不能为空',
            trigger: 'blur',
            defaule: 'longfei'
          }
        ],
        code: [{ required: true, trigger: 'change', message: '请输入验证码' }],
        password: [{ required: 'true', message: '密码不能为空', trigger: 'blur' }]
      }
    })
    let uuid = ''
    const submitForm = async () => {
      let aa = {}
      JSEncrypt(aa)
      let encryptor = new aa.JSEncrypt()
      encryptor.setPublicKey('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKoR8mX0rGKLqzcWmOzbfj64K8ZIgOdH\nnzkXSOVOZbFu/TJhZ7rFAN+eaGkl3C4buccQd/EjEsj9ir7ijT7h96MCAwEAAQ==') // 设置公钥
      let password = encryptor.encrypt(state.ruleForm.password)
      loginForm.value.validate(valid => {
        if (valid) {
          axios
            .post(state.type === 'login' ? '/login' : '/user', {
              username: state.ruleForm.username || '',
              // password: state.ruleForm.password,
              // password: md5(state.ruleForm.password),
              password,
              loginType: 'username',
              uuid,
              code: state.ruleForm.code
            })
            .then(res => {
              console.log('🚀 ~ submitForm ~ res:', res)
              if (state.type === 'login') {
                if (res.code === 200) {
                  ElMessage.success('登陆成功')
                  sessionStorage.setItem('token', 'Bearer ' + res.data?.token)
                  commonStore().setToken('Bearer ' + res.data?.token)
                  commonStore().setUsername(state.ruleForm.username)
                  // console.log('🚀 ~ submitForm ~ res.data:', res.data)
                  router.push('/home')
                  // 设置定时器2小时重新登陆
                  setTimeout(() => {
                    ElMessage.warning('token 过期, 请请重新登录')
                    commonStore().setToken('')
                    commonStore().setUsername('')
                    sessionStorage.removeItem('token')
                    setTimeout(() => router.push('/login'), 1000)
                  }, 2 * 60 * 60 * 1000)
                } else {
                  ElMessage.error(res.msg || '登陆失败, 请检查网络状态')
                }
              } else {
                if (res.code === 200) {
                  ElMessage.success('注册成功')
                  window.location.href = '/login'
                } else {
                  ElMessage.error(res.msg)
                }
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    const resetForm = () => {
      loginForm.value.resetFields()
    }
    let codeUrl = ref('')
    return {
      ...toRefs(state),
      codeUrl,
      getCode() {
        axios.get('/imgCaptcha').then(res => {
          let captchaEnabled = res.data.captchaEnabled === undefined ? true : res.data.captchaEnabled
          if (captchaEnabled) {
            codeUrl.value = 'data:image/gif;base64,' + res.data.img
            uuid = res.data.uuid
          }
        })
      },
      loginForm,
      submitForm,
      resetForm
    }
  },
  mounted() {
    window._l = this
    this.getCode()
  }
  // methods: { }
}
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}
.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.login-form .el-form-item {
  margin-bottom: 12px;
}
</style>
