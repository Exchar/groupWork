import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import(/* webpackChunkName: "about" */ '../views/index.vue')
      },
      {
        path: '/DeptMange',
        name: 'DeptMange',
        component: () => import(/* webpackChunkName: "about" */ '../views/DeptManage.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }]
    const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })

export default router
