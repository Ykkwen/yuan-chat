<template>
  <div class="h-12 flex justify-between items-center pl-5 pr-5 pt-1 pb-1 border-b-2 border-b-slate-400">
    <el-popover trigger="click" placement="bottom" title="" :width="150">
      昵称: 元 <br>
      性别: 男 <br>
      地址: 上海 <br>
      邮箱: 123@qq.com <br>
      <template #reference>
        <div class="h-full flex items-center">
          <img class="h-full rounded-full mr-3 hover:cursor-pointer" src="@/assets/avatar2.jpg" alt="">
          <div class="hover:cursor-pointer hover:underline">前端已死 {{ params.userId || params.groupId
          }}</div>
        </div>
      </template>
    </el-popover>

    <div class="w-14 h-4/5 text-center text-white rounded-full leading-8 cursor-pointer bg-red-500 hover:bg-red-600">
      退出
    </div>
  </div>
  <div class="w-full h-2/3 border-b-2 border-b-slate-400 pl-5 pr-5 overflow-auto">
    <template v-for=" item in dialogData" :key="item.id">
      <MessageFromOther v-if="item.senderId !== userId" :msg-obj="item"></MessageFromOther>
      <MessageFromMe v-else :msg-obj="item"></MessageFromMe>
    </template>
  </div>
  <textarea autofocus class="w-full h-full bg-transparent pl-1 focus:outline-none" v-model="message"
    :style="{ resize: 'none', height: '120px', borderBottom: '2px solid rgb(148 163 184)' }"
    @keydown="enterInput"></textarea>
  <div class="flex justify-end items-center text-sm h-9 text-white font-medium">
    <button class="w-14 h-6 rounded-full mx-2 border-0 bg-red-500 hover:text-red-500 hover:bg-white"
      @click="cleanMsg">清空</button>
    <button class="w-14 h-6 rounded-full mx-2 border-0 bg-sky-500 hover:text-sky-500 hover:bg-white"
      @click="sendMsg">发送</button>
  </div>
</template>

<script setup lang="ts">
import MessageFromOther from '@/components/Message/MessageFromOther.vue';
import MessageFromMe from '@/components/Message/MessageFromMe.vue';
import { DateTransform } from '@/utils/DateTransform'
import { Ref, ref } from 'vue';
import { msgType } from '@/type';
import { useRoute } from 'vue-router';
import { io } from "socket.io-client";
const message = ref('')
const userId = 0
const route = useRoute()
const params = route.params
const socket = io('http://localhost:3000', {
  transports: ['websocket']
});
socket.on('connect', function () {
  console.log('客户端和服务建立了连接', socket.id)
})
socket.on("hello", (arg) => {
  console.log(arg);
});
socket.on("disconnect", () => {
  console.log('断开连接'); // undefined
});
const dialogData: Ref<Array<msgType>> = ref([
  {
    id: 0,
    content: '测试内容',
    sendTime: '2023/03/03 13:58',
  }
])
const cleanMsg = () => {
  console.log('清空')
  message.value = ''
}
const enterInput = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    message.value += '\n'
  } else if (e.key === 'Enter') {
    e.preventDefault()
    sendMsg()
  }
}
const sendMsg = () => {
  if (message.value === '') return
  let msgObj: msgType = {
    id: Date.now(),
    content: message.value,
    senderId: userId,
    sendTime: DateTransform(new Date())
  }
  socket.emit('sendMsg-to-server', msgObj)
  dialogData.value.push(msgObj)
  console.log(msgObj)
  message.value = ''
}
</script>

<style scoped>
.from-other::after {
  content: '';
  width: 0;
  height: 0;
  border-right: 12px solid #4ade80;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  position: absolute;
  left: 32px;
  top: 6px;
  z-index: 3;
}

.from-me ::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 12px solid #4ade80;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  position: absolute;
  right: 32px;
  top: 6px;
  z-index: 3;
}
</style>