import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import MyShares from '@/components/MyShares'
import AMarket from '@/components/AShareMarket'
import Share from '@/components/ShareKLine'
import Test from '@/components/Test'
import Register from '@/components/Register'
import Hello from '@/components/Hello'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/myShares',
      name: 'MyShares',
      component: MyShares
    },
    {
      path: '/AMarket',
      name: 'AMarket',
      component: AMarket
    },
    {
      path: '/Share',
      name: 'Share',
      component: Share
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    }
  ]
})
