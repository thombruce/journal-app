import Vue from 'vue'
import VueRouter from 'vue-router'

import isElectron from 'is-electron'

import { user as gunUser } from '@/gun'

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
    component: Documents,
    meta: { layout: 'application' }
  },
  {
    path: '/documents/new',
    name: 'NewDocument',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "newDocument" */ '../views/documents/New.vue'),
    meta: { layout: 'application' }
  },
  {
    path: '/documents/:id',
    name: 'ShowDocument',
    component: () => import(/* webpackChunkName: "showDocument" */ '../views/documents/Show.vue'),
    meta: { layout: 'application' }
  },
  {
    path: '/documents/:id/edit',
    name: 'EditDocument',
    component: () => import(/* webpackChunkName: "editDocument" */ '../views/documents/Edit.vue'),
    meta: { layout: 'application' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/authentication/Login.vue'),
    meta: { layout: 'authentication' }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signUp" */ '../views/authentication/SignUp.vue'),
    meta: { layout: 'authentication' }
  }
]

const router = new VueRouter({
  mode: isElectron() ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['Login', 'SignUp']
  const authRequired = !publicPages.includes(to.name)
  const loggedIn = gunUser.is

  if (authRequired && !loggedIn) {
    return next({ name: 'Login' })
  }

  next()
})

export default router
