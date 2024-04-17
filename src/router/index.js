// eslint-disable-next-line
/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import MciHousingPolicy from '@/views/MciHousingPolicy'

const routes = [
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
