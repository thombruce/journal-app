import Vue from 'vue'
import VueRouter from 'vue-router'

import isElectron from 'is-electron'

import Documents from '../views/documents/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/documents'
  },
  {
    path: '/documents',
    name: 'Documents',
    component: Documents
  },
  {
    path: '/documents/new',
    name: 'NewDocument',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "newDocument" */ '../views/documents/New.vue')
  },
  {
    path: '/documents/:id',
    name: 'ShowDocument',
    component: () => import(/* webpackChunkName: "showDocument" */ '../views/documents/Show.vue')
  },
  {
    path: '/documents/:id/edit',
    name: 'EditDocument',
    component: () => import(/* webpackChunkName: "editDocument" */ '../views/documents/Edit.vue')
  }
]

const router = new VueRouter({
  mode: isElectron() ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
