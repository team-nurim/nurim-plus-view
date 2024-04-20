import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JoinStep01 from '../views/join/JoinStep01.vue'
import LoginView from '../views/LoginView.vue'
import Mypage from '../views/Mypage.vue'
import UpdateMemberInfo from '../views/UpdateMemberInfo.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/recommand',
    name: 'recommand',
    component: () => import(/* webpackChunkName: "about" */ '../views/RecommandView.vue')
  },
  {
    path: '/Go',
    name: 'GoTo',
    component: () => import(/* webpackChunkName: "about" */ '../views/GoToMyp.vue')
  },
  {
    path: '/chat',
    name: 'GoTo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChatView.vue')
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
  },
  {
    path: '/updateMemberInfo',
    name: 'updateMemberInfo',
    component: UpdateMemberInfo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
