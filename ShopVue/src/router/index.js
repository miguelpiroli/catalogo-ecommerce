import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Carrinho from '../views/Carrinho.vue' // importe o componente Carrinho

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: () => import('../views/ProductDetails.vue'),
  },
  {
    path: '/carrinho',
    name: 'Carrinho',
    component: Carrinho,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
