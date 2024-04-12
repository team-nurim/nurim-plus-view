import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminList from '../views/AdminList.vue'
import AdminRegister from '../views/AdminRegister.vue'

const routes = [
  {
    path: '/admin/list',
    name: 'admin/list',
    component: AdminList
  },
  {
    path: '/admin/register',
    name: 'admin/register',
    component: AdminRegister
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
