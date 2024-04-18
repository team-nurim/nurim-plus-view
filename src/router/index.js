import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminPostList from '../views/AdminPostList.vue'
import AdminPostRegister from '../views/AdminPostRegister.vue'
import AdminPostRead from '../views/AdminPostRead.vue'
import AdminPostModify from '../views/AdminPostModify.vue'
import AdminLogin from '../views/AdminLogin.vue'

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
    name: 'admin/post/read',
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
