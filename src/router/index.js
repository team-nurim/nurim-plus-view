import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminPostList from '../views/AdminPostList.vue'
import AdminPostRegister from '../views/AdminPostRegister.vue'
import AdminPostRead from '../views/AdminPostRead.vue'
import AdminPostModify from '../views/AdminPostModify.vue'
import AdminLogin from '../views/AdminLogin.vue'
import JoinView from '../views/join/JoinView.vue'
import LoginView from '../views/LoginView.vue'
import Mypage from '../views/mypage/Mypage.vue'
import UpdateMemberInfo from '../views/mypage/UpdateMemberInfo.vue'
import UpdateMemberInfo2 from '../views/mypage/UpdateMemberInfo2.vue'
import SwitchAccount from '../views/mypage/SwitchAccount.vue'
import Policy from '../views/Policy.vue'
import CommunityView from '../views/community/Community.vue'
import CommunityDetailView from '../views/community/CommunityDetail.vue'
import CommunityCreateView from '../views/community/CommunityCreateView.vue'
import CommunityUpdate from '../views/community/CommunityUpdate.vue'

const routes = [
  {
    path: '/admin/post/list',
    name: 'admin/post/list',
    props: true,
    component: AdminPostList
  },
  {
    path: '/admin/post/register',
    name: 'admin/post/register',
    component: AdminPostRegister
  },
  {
    path: '/admin/post/modify/:postId',
    name: 'admin/post/modify',
    props: true, // props를 true로 설정하여 postId를 컴포넌트에 전달합니다.
    component: AdminPostModify
  },
  {
    path: '/admin/post/read/:postId', // postId를 동적으로 받아오는 부분입니다.
    name: 'AdminPostRead',
    props: true, // props를 true로 설정하여 postId를 컴포넌트에 전달합니다.
    component: AdminPostRead
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: AdminLogin
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
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
  {
    path: '/policy',
    name: 'policy',
    component: Policy
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
