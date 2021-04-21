import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import axios from 'axios'
Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'
// axios.defaults.baseURL = 'http://49.235.104.233:3000/' // 高校节点
// axios.defaults.baseURL = 'http://8.142.46.6:3000/'  // 教育部节点
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
//设置 token

axios.interceptors.request.use(config=>{
  const token = window.sessionStorage.getItem('token')
  config.headers.Authorization = token
  return config
})


var bus = new Vue()
Vue.prototype.bus = bus
Vue.use(BootstrapVue)
 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
