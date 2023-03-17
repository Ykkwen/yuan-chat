import service from "./index";

export interface LoginFormType {
  email: string,
  password: string,
  nickname?: string
}
export interface UserInfo {
  id?: number|string,
  email?: string,
  password?: string,
  nickname?: string,
  avatar?: string
}

export const loginApi = (data: LoginFormType)=>{
  return service({
    url:'/user/login',
    method: 'post',
    data
  })
}

export const registerApi = (data: LoginFormType)=>{
  return service({
    url:'/user/register',
    method: 'post',
    data
  })
}

export const reqUserById = (params: any)=>{
  return service({
    url: '/user/getUserById',
    method: 'get',
    params
  })
}
