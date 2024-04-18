import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: ,
    // },
    {
      path: '/addPerson',
      name: 'addPerson',
      component: () => import('../views/AddPersonView.vue')
    }
    ,
    {
      path: '/editPerson',
      name: 'editPerson',
      component: () => import('../views/EditPersonView.vue')
    }
  ]
})

export default router
