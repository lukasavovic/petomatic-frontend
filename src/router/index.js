import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import addVisit from '@/components/addVisit'
import allCustomers from '@/components/Customers'
import addCustomer from '@/components/addCustomer'
import allUsers from '@/components/allUsers'
import userProfile from '@/components/userProfile'
import addUser from '@/components/addUser'
import editVisit from '@/components/editVisit'

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
    },
    {
      path: '/allUsers',
      name: 'allUsers',
      component: allUsers
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: addUser
    },
    {
      path: '/addCustomer',
      name: 'addCustomer',
      component: addCustomer
    },
    {
      path: '/userProfile/:id',
      name: 'userProfile',
      component: userProfile,
      props: true
    },
    {
      path: '/editVisit/:id',
      name: 'editVisit',
      component: editVisit,
      props: true
    }
  ]
})
