import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index.js'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() // 事件总线为一个vue实例

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
