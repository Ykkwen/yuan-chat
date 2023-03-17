import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../views/index.vue"),
    children: [
      {
        path: "/userWindow/:userId",
        component: () => import("../views/userChatWindow.vue"),
      },
      {
        path: "/groupWindow/:groupId",
        component: () => import("../views/groupChatWindow.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to,from,next)=>{
  if(to.path!=='/login'){
    if(localStorage.getItem('token')){
      next()
    }
    else{
      next({path: '/login'})
    }
  }else{
    next()
  }
})
export default router;
