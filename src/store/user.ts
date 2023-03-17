import { UserInfo } from '@/api/user'
import {defineStore} from 'pinia'
const getJsonObject = (jsonStr: string | null) => {
  if (jsonStr) {
      return JSON.parse(jsonStr)
  } else {
      return {}
  }
}
export const useUserStore = defineStore('user', {
  state: ()=>{
    return {
      user: getJsonObject(localStorage.getItem('user')) as UserInfo,
      token: localStorage.getItem('token')
    }
  },
  actions: {
    saveUser(user:object, token:string){
      this.user = user
      this.token = token
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('token', this.token)
    },
    removeUser(){
      this.user = {},
      this.token = '',
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})