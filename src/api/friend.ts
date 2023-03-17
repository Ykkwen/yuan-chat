import service from ".";

export const reqAllFriends = (params: any)=>{
  return service({
    url:'/friend/friend_list',
    method: 'get',
    params
  })
}