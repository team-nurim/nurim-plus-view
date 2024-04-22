import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JoinView from '../views/join/JoinView.vue'
import LoginView from '../views/LoginView.vue'
import Mypage from '../views/mypage/Mypage.vue'
import UpdateMemberInfo from '../views/mypage/UpdateMemberInfo.vue'
import UpdateMemberInfo2 from '../views/mypage/UpdateMemberInfo2.vue'
import SwitchAccount from '../views/mypage/SwitchAccount.vue'
import Policy from '../views/Policy.vue'
import RecommendMain from '../views/RecommendMain.vue'
import Recommend from '../views/Recommend.vue'
import PostView from '../views/policy/PostView.vue'
import CommunityView from '../views/community/Community.vue'
import CommunityDetailView from '../views/community/CommunityDetail.vue'
import CommunityCreateView from '../views/community/CommunityCreateView.vue'
import CommunityUpdate from '../views/community/CommunityUpdate.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: '/community',
    name: 'community',
    component: CommunityView,
  },
  {
    path: '/community/:communityId',
    name: 'CommunityDetailView',
    component: CommunityDetailView,
    props: true
  },
  {
    path: '/CommunityCreate',
    name: 'CommunityCreate',
    component: CommunityCreateView,
  },
  {
    path: '/CommunityUpdate/:communityId',
    name: 'CommunityUpdate',
    component: CommunityUpdate,
    props: true
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
  },
  ,
  {
    path: '/policy',
    name: 'policy',
    component: Policy
  },
  {
    path: '/post/read',
    name: 'PostView',
    component: () => import('../views/policy/PostView.vue')
  },
  {
    path: '/recommend-main',
    name: ' RecommendMain',
    component: () => import('../views/RecommendMain.vue')
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import('../views/Recommend.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router