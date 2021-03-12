import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Projection from '../views/Projection.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projection',
    name: 'Projection',
    component: Projection
  },
]

const router = new VueRouter({
  routes
})

export default router
