<template>
  <div class="login-main">
    <el-tabs v-model="activeName" class="login-tabs" stretch @tab-click="handleClick">
      <el-tab-pane label="Login" name="login">
        <div class="login-main-title"></div>
        <el-form :model="loginForm" label-width="70px" :rules="rules">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginForm.email" placeholder="请输入邮箱号" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password />
          </el-form-item>
          <div class="login-main-bottom">
            <el-button type="info" @click="clean" round>重置</el-button>
            <el-button type="primary" @click="onSubmit" round>登录</el-button>
          </div>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="Register" name="register">
        <div class="login-main-title"></div>
        <el-form :model="registerForm" label-width="70px" :rules="rules">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email" placeholder="请输入注册邮箱" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="registerForm.nickname" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" show-password />
          </el-form-item>
          <div class="login-main-bottom">
            <el-button type="info" @click="clean" round>重置</el-button>
            <el-button type="primary" @click="onSubmit" round>注册</el-button>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormRules, TabsPaneContext } from 'element-plus';
import { nextTick, reactive, Ref, ref } from 'vue';
import {loginApi, LoginFormType, registerApi} from '@/api/user'
import router from '@/router';
import { useUserStore } from '@/store/user';
const userStore = useUserStore()
const activeName = ref('login')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  nextTick(() => {
    console.log(activeName.value)
  })
  clean()
}
const loginForm: Ref<LoginFormType> = ref({
  email: '',
  password: ''
})
const registerForm: Ref<LoginFormType> = ref({
  email: '',
  nickname: '',
  password: ''
})
const rules = reactive<FormRules>({
  email: [
    { required: true, message: '邮箱号不能为空', trigger: 'blur' },
    { pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$', message: '请输入正确的邮箱号', trigger: 'blur' }
  ],
  nickname: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' },],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    { min: 6, max: 16, message: '请输入6-16位密码', trigger: 'blur' },
  ],
})
const onSubmit = async () => {
  if(activeName.value === 'login'){
    const res = await loginApi(loginForm.value)
    console.log('loginApi', res)
    if(res.data.status){
      userStore.saveUser(res.data.data,res.data.token)
      router.replace('/')
    } 
  } else if(activeName.value === 'register') {
    const res = await registerApi(registerForm.value)
    activeName.value = 'login'
    console.log('registerApi', res)
  }
}
const clean = () => {
  loginForm.value = {
    email: '',
    password: ''
  }
  registerForm.value = {
    email: '',
    nickname: '',
    password: ''
  }
}
</script>

<style lang="less" scoped>
.login-main {
  width: 400px;
  height: auto;
  margin: auto;
  padding: 20px;
  padding-right: 30px;
  border-radius: 20px;
  background-color: rgba(133, 133, 133, 0.4);
  color: white;

  &-title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;
  }

  :deep(.el-form-item__label) {
    color: white;
  }

  :deep(.el-input__wrapper) {
    background-color: transparent;
  }

  :deep(.el-input__inner) {
    color: white;
  }

  &-bottom {
    width: 100%;
    margin: 30px 0 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-button {
      width: 140px;
      margin: 0 10px;
    }
  }

  :deep(.el-tabs__item) {
    color: white;
    font-size: 16px;

    &:hover {
      color: cornflowerblue;
    }
  }
}
</style>