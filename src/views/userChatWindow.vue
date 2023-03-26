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
          <div class="hover:cursor-pointer hover:underline">{{ friendInfo.nickname }}</div>
        </div>
      </template>
    </el-popover>

    <!-- <div class="w-14 h-4/5 text-center text-white rounded-full leading-8 cursor-pointer bg-red-500 hover:bg-red-600">
      退出
    </div> -->
  </div>
  <div class="w-full h-2/3 border-b-2 border-b-slate-400 pl-5 pr-5 overflow-auto">
    <template v-for=" item in computedDialog" :key="item.id">
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
import { reqUserById } from '@/api/user'
import { DateTransform } from '@/utils/DateTransform'
import { computed, Ref, ref, watch } from 'vue';
import { msgType } from '@/type';
import { useRoute } from 'vue-router';
import { io } from "socket.io-client";
import { useUserStore } from '@/store/user';
import {UserInfo} from '@/api/user'
const message = ref('')
const userId = useUserStore().user.id as number|string
const route = useRoute()
const friendId = ref()
const friendInfo:Ref<UserInfo> = ref({})
const friendSocketId = ref('')
watch(() => route.params.userId, () => {
  friendId.value = Number(route.params.userId) as number
  reqUserById({ id: friendId.value }).then(res => {
    // console.log(res)
    friendInfo.value = res.data.data
  })
},{immediate: true})
const messageBox:Ref<any> = ref({})
  console.log(friendId)
const computedDialog = computed(()=>{return (messageBox.value[userId]&&friendId.value) ? messageBox.value[userId].filter((item: { senderId: Ref<any>; receiverId: Ref<any>; })=>item.senderId==friendId.value||item.receiverId==friendId.value) : []})
watch(()=>computedDialog.value,()=>{
  console.log(computedDialog)
})
const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  query: {
    username: useUserStore().user.nickname,
    userId
  }
});
socket.on('connect', function () {
  console.log('客户端和服务建立了连接', socket.id)
})
const onlineList = ref([])
socket.on('online',(data)=>{
  onlineList.value = data
  console.log('在线列表',onlineList.value)
  friendSocketId.value = data.filter((item:any)=>item.userId==friendId.value)[0].socketId
  console.log('friendSocketId',friendSocketId.value)
})
socket.on('receive-from-one', function (data) {
  console.log('receive-from-one',data)
  !messageBox.value[userId]&&(messageBox.value[userId] = [])
  messageBox.value[userId].push(data)
  console.log(messageBox)
})

socket.on("disconnect", () => {
  console.log('断开连接'); // undefined
});
const cleanMsg = () => {
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
    receiverId: friendId.value,
    sendTime: DateTransform(new Date())
  }
  !messageBox.value[userId]&&(messageBox.value[userId] = [])
  messageBox.value[userId].push(msgObj)
  socket.emit('sendMsg-to-one', {toSocketId: friendSocketId.value, msgObj})
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