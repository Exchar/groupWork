import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import Resource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(Resource)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
    children: [{
      path: '/',
      name: 'Index',
      component: () => import('../views/Index.vue')
    },
    {
      path: '/DeptManage',
      name: 'Dept',
      component: () => import('../views/DeptManage.vue')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
