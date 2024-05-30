<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img class="logo" :src="logo" />
        <div class="name">
          <div class="title">安全管理平台</div>
          <div class="tips"></div>
        </div>
      </div>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div> -->
          <el-button style="width: 100%" type="primary" @click="submitForm">立即{{ type === 'login' ? '登录' : '注册'
            }}</el-button>
          <!-- <el-button plain @click="resetForm">重置</el-button> -->
          <el-button plain type="text" @click="type = type === 'login' ? 'register' : 'login'">{{ type === 'login' ?
          '注册' : '登录' }}</el-button>
          <router-link to="/loginRemote" class="login-link">远程登陆</router-link>
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
import logo from '@/assets/logo.png'
export default {
  name: 'Login',
  setup() {
    const loginForm = ref(null)
    const state = reactive({
      type: 'login',
      ruleForm: {
        username: '',
        password: ''
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
        password: [{ required: 'true', message: '密码不能为空', trigger: 'blur' }]
      }
    })
    commonStore().setEnv('local')
    // axios.defaults.baseURL = '/api'
    const submitForm = async () => {
      loginForm.value.validate(valid => {
        if (valid) {
          axios
            .post(state.type === 'login' ? '/login' : '/user', {
              username: state.ruleForm.username || '',
              password: state.ruleForm.password
              // passwordMd5: md5(state.ruleForm.password)
            })
            .then(res => {
              if (state.type === 'login') {
                if (res.code === 200) {
                  ElMessage.success('登陆成功')
                  sessionStorage.setItem('token', res.data.token)
                  commonStore().setToken(res.data.token)
                  commonStore().setUsername(state.ruleForm.username)
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
                  state.type = 'login'
                } else {
                  ElMessage.error(res.msg)
                }
              }
            })
        } else {
          return false
        }
      })
    }
    const resetForm = () => {
      loginForm.value.resetFields()
    }
    return {
      logo,
      ...toRefs(state),
      loginForm,
      submitForm,
      resetForm
    }
  }
  // methods: { }
}
</script>

<style lang="less" scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.login-container {
  width: 420px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
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
    padding-bottom: 20px;
  }
  .login-link {
    margin-left: 12px;
    color: #409eff;
    text-decoration: none;
  }
}
</style>
