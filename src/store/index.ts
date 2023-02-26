import { createPinia } from "pinia"
export const pinia = createPinia()
import { defineStore } from "pinia";

const chat = defineStore('chatStore', {
  state:()=>{
    return {

    }
  }
})
export default chat