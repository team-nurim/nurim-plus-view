// eslint-disable-next-line
/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import MemberJoin from '../views/MemberJoin.vue'
import MciHousingPolicy from '@/views/MciHousingPolicy'

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
    path: '/mcihousingpolicy',
    name: 'MciHousingPolicy',
    component: MciHousingPolicy
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
