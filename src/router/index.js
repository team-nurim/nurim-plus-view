import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MemberJoin from '../views/MemberJoin.vue'
import Mypage from '../views/Mypage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/join',
    name: 'join',
    component: MemberJoin
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: Mypage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
