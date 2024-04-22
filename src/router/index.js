import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JoinView from '../views/join/JoinView.vue'
import LoginView from '../views/LoginView.vue'
import Mypage from '../views/mypage/Mypage.vue'
import UpdateMemberInfo from '../views/mypage/UpdateMemberInfo.vue'
import UpdateMemberInfo2 from '../views/mypage/UpdateMemberInfo2.vue'
import SwitchAccount from '../views/mypage/SwitchAccount.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/recommandMain',
    name: 'recommand',
    component: () => import(/* webpackChunkName: "about" */ '../views/RecommanMain.vue')
  },
  {
    path: '/Go',
    name: 'GoTo',
    component: () => import(/* webpackChunkName: "about" */ '../views/GoToMyp.vue')
  },
  {
    path: '/Recommand',
    name: 'GoTo',
    component: () => import(/* webpackChunkName: "about" */ '../views/Recommand.vue')
  },
  {
    path: '/join',
    name: 'join',
    component: JoinView
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
  },
  {
    path: '/updateMemberInfo2',
    name: 'updateMemberInfo2',
    component: UpdateMemberInfo2
  },
  {
    path: '/switchAccount',
    name: 'switchAccount',
    component: SwitchAccount
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router