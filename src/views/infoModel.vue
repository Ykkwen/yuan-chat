<template>
  <el-dialog :modal="false" :draggable="true" v-model="visible" :title="props.title" width="30%" @close="close">
    <el-form :model="formData" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model="formData.nickname" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" show-password/>
      </el-form-item>
    </el-form>
    <div :style="{display: 'flex', justifyContent: 'flex-end'}">
      <el-button @click="close">取消</el-button>
      <el-button :style="{backgroundColor: '#79bbff'}" type="primary" @click="onSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">import { ref } from 'vue';

const props = defineProps<{
  title:string,
  form:{
    avatar?:string,
    nickname?:string,
    password?:string
  }
}>()
const formData = ref(props.form)
const visible = ref(false)
const open  = () => {
  visible.value = true
}
const close = () => {
  visible.value = false
}
const onSubmit = () => {
  console.log(formData.value)
  visible.value = false
}
defineExpose({
  open
})
</script>

<style scoped></style>