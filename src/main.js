import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import scripts from '@/scripts'
import constant from '@/constant'
import '@/directive/directive'

import '@/icons' // icon
import '@/permission' // permission control

Vue.prototype.$scripts = scripts
Vue.prototype.$constant = constant
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
