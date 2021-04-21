import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () => import('../components/Index.vue')
const Manager = () => import('../components/Manager.vue')
const LeftIdNum = () => import('../components/IndexBodyLeft/LeftIdNum.vue')
const LeftCerNum = () => import('../components/IndexBodyLeft/LeftCerNum.vue')
const Login = () => import('../components/Login.vue')
const SuperManager = () => import('../components/SuperManager.vue')
const RegisterInfo = () => import('../components/supermanager/RegisterInfo.vue')
const SchoolControl = () => import('../components/supermanager/SchoolControl.vue')
// const Manager = () => import('../components/Manager.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: '',
        redirect: 'leftIdNum'
      },
      {
        path: 'leftIdNum',
        component: LeftIdNum
      },
      {
        path: 'leftCerNum',
        component: LeftCerNum
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/manager',
    component: Manager
  },
  {
    path: '/supermanager',
    component: SuperManager,
    children: [
      {
        path: '',
        redirect: 'registerinfo'
      },
      {
        path: 'registerinfo',
        component: RegisterInfo
      },
      {
        path: 'schoolcontrol',
        component: SchoolControl
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
