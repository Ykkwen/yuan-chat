import { reqAllFriends } from '@/api/friend';
import {defineStore, storeToRefs} from 'pinia';
import { useUserStore } from './user';

export const useFriend = defineStore('friend', {
  state() {
      return {
        friendList:[]
      }
  },
  actions: {
    async saveFriendList(){
      const userStore = useUserStore()
      const {user} = storeToRefs(userStore)
      const res = await reqAllFriends({id: user.value.id})
      this.friendList = res.data.data
      return res.data.data
    }
  }
})