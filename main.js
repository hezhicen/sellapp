import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
//全局注册viewui的所有组件
Vue.use(ViewUI);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
