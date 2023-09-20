import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: '/come',
        name: 'come',
        component: () => import('../views/come.vue')
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('../views/list.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  let token=localStorage.getItem('token')
  if(!token&&to.path!='/login'){
    next('/login')
  }else{
    if(token&&to.path=='/login'){
      next('/')
    }else{
      next()
    }
  }
})
export default router
