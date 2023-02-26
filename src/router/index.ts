import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: '/index',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/index.vue')
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
