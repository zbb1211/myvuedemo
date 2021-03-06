// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
// eslint-disable-next-line
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import axios from 'axios';
import seller from './components/seller/seller';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {path: '/goods',component:goods},
  {path: '/ratings',component:ratings},
  {path: '/seller',component:seller},
  {path:'/',component:goods}
];
const router = new VueRouter({
  mode: 'history',
  routes
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
