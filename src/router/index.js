// router/index.js 파일
// eslint-disable-next-line
/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import AdminMembers from '@/views/AdminMembers.vue'; // 관리자 회원관리 페이지
import DetailMember from '@/views/DetailMember.vue';
import MemberList from '@/views/MemberList.vue';
import SearchMember from '@/views/SearchMember.vue';
import HomeView from '../views/HomeView.vue'
import AdminPostList from '../views/post/AdminPostList.vue'
import AdminPostRegister from '../views/post/AdminPostRegister.vue'
import AdminPostRead from '../views/post/AdminPostRead.vue'
import AdminPostModify from '../views/post/AdminPostModify.vue'
import AdminLogin from '../views/AdminLogin.vue'
import JoinView from '../views/join/JoinView.vue'
import LoginView from '../views/LoginView.vue'
import Mypage from '../views/mypage/Mypage.vue'
import UpdateMemberInfo from '../views/mypage/UpdateMemberInfo.vue'
import UpdateMemberInfo2 from '../views/mypage/UpdateMemberInfo2.vue'
import SwitchAccount from '../views/mypage/SwitchAccount.vue'
import Policy from '../views/policy/Policy.vue'
import RecommendMain from '../views/recommend/RecommendMain.vue'
import Recommend from '../views/recommend/Recommend.vue'
import PostView from '../views/policy/PostView.vue'
import CommunityView from '../views/community/Community.vue'
import CommunityDetailView from '../views/community/CommunityDetail.vue'
import CommunityCreateView from '../views/community/CommunityCreateView.vue'
import CommunityUpdate from '../views/community/CommunityUpdate.vue'

const routes = [
  {
    path: '/admin/post/list',
    name: 'AdminPostList',
    props: true,
    meta: { requiresAuth: true }, // 권한 확인을 위한 meta 필드 추가
    component: AdminPostList
  },
  {
    path: '/admin/post/register',
    name: 'AdminPostRegister',
    meta: { requiresAuth: true }, // 권한 확인을 위한 meta 필드 추가
    component: AdminPostRegister
  },
  {
    path: '/admin/post/modify/:postId',
    name: 'AdminPostModify',
    props: true, // props를 true로 설정하여 postId를 컴포넌트에 전달합니다.
    meta: { requiresAuth: true }, // 권한 확인을 위한 meta 필드 추가
    component: AdminPostModify
  },
  {
    path: '/admin/post/read/:postId', // postId를 동적으로 받아오는 부분입니다.
    name: 'AdminPostRead',
    props: true, // props를 true로 설정하여 postId를 컴포넌트에 전달합니다.
    meta: { requiresAuth: true }, // 권한 확인을 위한 meta 필드 추가
    component: AdminPostRead
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: AdminLogin
  },
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
    path: "/updateMemberInfo",
    name: "updateMemberInfo",
    component: UpdateMemberInfo,
  },
  {
    path: "/community",
    name: "community",
    component: CommunityView,
  },
  {
    path: "/community/:communityId",
    name: "CommunityDetailView",
    component: CommunityDetailView,
    props: true,
  },
  {
    path: "/CommunityCreate",
    name: "CommunityCreate",
    component: CommunityCreateView,
  },
  {
    path: "/CommunityUpdate/:communityId",
    name: "CommunityUpdate",
    component: CommunityUpdate,
    props: true,
  },
  {
    path: "/updateMemberInfo2",
    name: "updateMemberInfo2",
    component: UpdateMemberInfo2,
  },
  {
    path: "/switchAccount",
    name: "switchAccount",
    component: SwitchAccount,
  },
  {
    path: "/post/read/:postId",
    name: "PostView",
    component: () => import("../views/policy/PostView.vue"),
    props: true,
  },
  {
    path: "/mcihousingpolicy",
    name: "MciHousingPolicy",
    component: MciHousingPolicy,
  },
  {
    path: '/admin/members',
    name: 'AdminMembers',
    component: AdminMembers
  },
  // { path: '/admin/members', component: AdminMembers },
  // { path: '/admin/members/:id', component: DetailMember, name: 'DetailMember' },
  // { path: '/admin/member-list', component: MemberList },
  // { path: '/admin/search-member', component: SearchMember },
  {
    path: '/post/read/:postId',
    name: 'PostView',
    component: () => import('../views/policy/PostView.vue'),
    props: true
  },
  {
    path: '/recommend-main',
    name: ' RecommendMain',
    component: () => import('../views/recommend/RecommendMain.vue')
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import('../views/recommend/Recommend.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from, next) => {
  // 권한이 필요한 페이지인지 확인
  if (to.meta.requiresAuth) {
    try {
      // 사용자의 로그인 상태 확인
      const isLoggedIn = await checkLoggedIn();
      if (isLoggedIn) {
        // 사용자의 권한 확인
        const isAdmin = await checkAdminRole();
        if (isAdmin) {
          // 사용자가 관리자인 경우에는 그대로 진행
          next();
        } else {
          // 사용자가 관리자가 아닌 경우 메인페이지로 리다이렉트
          next('/');
        }
      } else {
        // 사용자가 로그인되어 있지 않은 경우 로그인 페이지로 리다이렉트
        next('/login');
      }
    } catch (error) {
      console.error('권한 확인에 실패했습니다.', error);
      // 에러 발생 시 메인페이지로 리다이렉트
      next('/');
    }
  } else {
    // 권한이 필요하지 않은 페이지는 그대로 진행
    next();
  }
});

// 사용자의 로그인 상태 확인하는 함수
async function checkLoggedIn() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken; // 토큰이 있으면 true, 없으면 false 반환
  } catch (error) {
    console.error('로그인 상태 확인에 실패했습니다.', error);
    return false;
  }
}

// 사용자의 권한 확인하는 함수
async function checkAdminRole() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return false;
    const response = await axios.get('/api/v1/members/mypage', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const memberRole = response.data.memberRole;
    // 사용자의 권한이 ADMIN인지 확인
    return memberRole === 'ADMIN';
  } catch (error) {
    console.error('권한 확인에 실패했습니다.', error);
    return false;
  }
}
export default router
