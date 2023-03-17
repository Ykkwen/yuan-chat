import { useUserStore } from "@/store/user";
import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 6000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  // withCredentials: true,
});
service.interceptors.request.use(
  (config) => {
    const token = useUserStore().token
    if (token) {
        config.headers.set('Authorization', token)
    }
    return config;
  },
  (error) => {
    ElMessage.error(error);
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    console.log('响应拦截')
    if(response.data.status){
      // ElMessage.success(response.data.msg)
    } else {
      ElMessage.error(response.data.msg)
    }
    return response
  },
  (error) => {
    ElMessage.error(error);
    return Promise.reject(error);
  }
);

export default service;
