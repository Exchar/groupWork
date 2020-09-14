import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
