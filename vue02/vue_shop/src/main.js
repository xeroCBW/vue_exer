// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/css/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'

Vue.use(ElementUI)

//配置请求的根路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'


//设置token
axios.interceptors.request.use(config=>{

  // console.log(config)
  // console.log( window.sessionStorage.getItem('token'))
  config.headers.Authorization = window.sessionStorage.getItem('token')

  return config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

//使用tree-table
Vue.component('tree-table',TreeTable)


Vue.filter('dateFormat',function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  //月份是从0 开始计算的
  const m = (dt.getMonth() + 1 +'').padStart(2,'0') // 不足的地方以0 来进行填充
  const d = (dt.getDate() + '').padStart(2,'0') // 不足的地方以0 来进行填充

  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.seconds() + '').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
