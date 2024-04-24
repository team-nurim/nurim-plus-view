// router/index.js 파일
// eslint-disable-next-line
/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import AdminMembers from '@/views/AdminMembers.vue'; // 관리자 회원관리 페이지
import DetailMember from '@/views/DetailMember.vue';
import MemberList from '@/views/MemberList.vue';
import SearchMember from '@/views/SearchMember.vue';
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
  },
  { path: '/', component: AdminMembers }, // 홈 페이지로 설정
  { path: '/admin/members', component: AdminMembers },
  { path: '/admin/members/:id', component: DetailMember, name: 'DetailMember' },
  { path: '/admin/member-list', component: MemberList },
  { path: '/admin/search-member', component: SearchMember },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 라우터 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
  // 홈 페이지로 이동하는 경우에만 허용
  if (to.path === '/') {
    next();
  } else {
    // 나머지 경우에는 홈 페이지로 리다이렉트
    next('/');
  }
});

export default router;
