import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import addVisit from '@/components/addVisit'
import allCustomers from '@/components/Customers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/addVisit',
      name: 'addVisit',
      component: addVisit
    },
    {
      path: '/allCustomers',
      name: 'allCustomers',
      component: allCustomers
    }
  ]
})
