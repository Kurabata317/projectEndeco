import { createRouter, createWebHistory } from 'vue-router'
import DecodeView from '../views/DecodeView.vue'
import EncodeView from '../views/EncodeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: ['/decode'],
      name: 'decode',
      component: DecodeView
    },
    {
      path: '/encode',
      name: 'encode',
      component: EncodeView
    }
  ]
})

export default router
