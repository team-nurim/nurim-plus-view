import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MemberJoin from '../views/MemberJoin.vue'
import CommunityView from '../views/community.vue'

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
    path: '/community',
    name: 'community',
    component: CommunityView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
