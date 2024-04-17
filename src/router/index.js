import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JoinStep01 from '../views/join/JoinStep01.vue'
import LoginView from '../views/LoginView.vue'
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
    component: JoinStep01
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
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
