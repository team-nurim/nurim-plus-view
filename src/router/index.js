// router/index.js 파일
// eslint-disable-next-line
/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import AdminMembers from '@/views/AdminMembers.vue'; // 관리자 회원관리 페이지
import DetailMember from '@/views/DetailMember.vue';
import MemberList from '@/views/MemberList.vue';
import SearchMember from '@/views/SearchMember.vue';

const routes = [
  { path: '/', component: AdminMembers }, // 홈 페이지로 설정
  { path: '/admin/members', component: AdminMembers },
  { path: '/admin/members/:id', component: DetailMember, name: 'DetailMember' },
  { path: '/admin/member-list', component: MemberList },
  { path: '/admin/search-member', component: SearchMember },
];

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
