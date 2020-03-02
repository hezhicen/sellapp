import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: main,
    children: [
      {
        path: '/',
        component: () => import('../views/Goods.vue'),
      },
      {
        path: '/evaluate',
        component: () => import('../views/Evaluate.vue'),
      },
      {
        path: '/merchant',
        component: () => import('../views/Merchant.vue'),
      },
     
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
