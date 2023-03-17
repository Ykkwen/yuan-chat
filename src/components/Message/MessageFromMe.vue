<template>
  <div class="from-me flex flex-row-reverse items-center relative mt-3 mb-3">
    <img class="h-7 rounded-full ml-3" src="@/assets/avatar.jpg" alt="">
    <div class="me bg-green-400 max-w-md pl-3 pr-3 text-sm rounded-lg" @click="handleShowSendTime"
      :style="{ lineHeight: '28px' }">{{ props.msgObj.content }}</div>
  <div v-if="showSendTime" class="send-time">{{ props.msgObj.sendTime }}</div>
  </div>
</template>

<script setup lang="ts">
import { msgType } from '@/type';
import { ref } from 'vue';
const showSendTime = ref(false)
const props = defineProps<{
  msgObj: msgType,
}>()
const handleShowSendTime = () => {
  showSendTime.value = !showSendTime.value
}
</script>

<style scoped>
.send-time {
  margin: 0 10px;
  font-size: 8px;
  color: #333;
}
</style>