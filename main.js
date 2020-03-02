import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ViewUI from 'view-design';
import store from './store/index';
import 'view-design/dist/styles/iview.css';
//全局注册viewui的所有组件
Vue.use(ViewUI);
Vue.config.productionTip = false;
//把router和store注入vue实例中，此处代码是固定的，不能改变，大小写也不能改变
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// store

