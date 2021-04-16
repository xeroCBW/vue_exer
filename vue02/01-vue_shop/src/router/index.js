import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'
import Rights from '@/components/power/Rights'
import Roles from '@/components/power/Roles'
import Categories from '@/components/goods/Categories'
import Params from '@/components/goods/Params'
import List from '@/components/goods/List'
import AddGoods from '@/components/goods/AddGoods'
import Orders from '@/components/order/Orders'
import Reports from '@/components/report/Reports'

Vue.use(Router)



const  router = new Router({
  routes: [
    //设置登录组件
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      component: Login
    },
    {
      path:'/home',
      component: Home,
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          component:Welcome
        },
        {
          path:'/users',
          component:Users
        },
        {
          path:'/rights',
          component:Rights
        },
        {
          path:'/roles',
          component:Roles
        },
        {
          path:'/categories',
          component:Categories
        },
        {
          path:'/params',
          component:Params
        },
        {
          path:'/goods',
          component:List
        },
        {
          path:'/goods/add',
          component:AddGoods
        },
        {
          path:'/orders',
          component:Orders
        },
        {
          path:'/reports',
          component:Reports
        }


      ]
    }


  ]
})

//挂载路由导航守卫

router.beforeEach((to,from,next)=>{

//  to 表示将要访问的路径

//  from 从哪个路径跳转而来

//  next 是一个函数,表示放行

//  next() 直接放行

//  next('/') 要跳转的路径

  //登录页面直接放行
  if(to.path === '/login')return next();
//  获取token

  const  token_str = window.sessionStorage.getItem('token')
  if (!token_str)return next('/login')
  //直接放行
  next()


})




export default router
