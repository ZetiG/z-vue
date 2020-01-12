import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://localhost:8000'

Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   // ...
//   if (from.path === '/') {
//     if (to.path === '/login') {
//       next()
//     } else {
//       next('/login')
//     }
//   } else if (from.path === '/login') {
//     next()
//   } else {
//     next()
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
