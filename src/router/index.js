import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminPostList from '../views/AdminPostList.vue'
import AdminPostRegister from '../views/AdminPostRegister.vue'
import AdminPostRead from '../views/AdminPostRead.vue'
import AdminPostModify from '../views/AdminPostModify.vue'

const routes = [
  {
    path: '/admin/post/list',
    name: 'admin/post/list',
    component: AdminPostList
  },
  {
    path: '/admin/post/register',
    name: 'admin/post/register',
    component: AdminPostRegister
  },
  {
    path: '/admin/post/modify:postId',
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
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
