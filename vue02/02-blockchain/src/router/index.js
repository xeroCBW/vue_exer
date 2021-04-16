import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import NotFound from '@/components/NotFound'
import Users from '@/components/user/Users'
import Welcome from '@/components/Welcome'

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/home',
      name:'Home',
      component:Home,
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          component:Welcome
        },
        {
          path: '/users',
          name: 'users',
          component: Users
        },
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },

    {
      path: '*',    // 此处需特别注意至于最底部
      redirect: '/404'
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
