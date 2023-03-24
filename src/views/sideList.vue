<template>
  <div class="w-full pl-1 pr-2 flex-1 overflow-auto">
    <template v-for="(item) in showList">
      <div
        class="h-12 p-3 mb-1 flex cursor-pointer rounded-lg justify-start items-center bg-black bg-opacity-10 hover:bg-slate-900"
        @click="openChatWindow(item.id as number)" draggable="true">
        <img class="h-9" src="@/assets/avatar.jpg" alt="">
        <div class="ml-3 text-base text-cyan-100 overflow-hidden overflow-ellipsis">{{ item.nickname }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reqAllFriends } from '@/api/friend';
import { UserInfo } from '@/api/user'
import { useFriend } from '@/store/friend';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
  type: string
}>()
// const userStore = useUserStore()
// const {user} = storeToRefs(userStore)
const friendList: Ref<Array<UserInfo>> = ref([])
const groupList: any = ref([])
const showList:any = ref([])
  watch(() => props.type, async () => {
  if (props.type === 'USER') {
    friendList.value = await useFriend().saveFriendList()
    showList.value = friendList.value
    console.log('getfriend', friendList)
  } else if (props.type === 'GROUP') {
    groupList.value = []
    showList.value = groupList.value
  }
}, { immediate: true })
const openChatWindow = (friendId:number) => {
  if (props.type === 'USER') {
    router.replace(`/userWindow/${friendId}`)
  } 
  
}


</script>

<style scoped></style>