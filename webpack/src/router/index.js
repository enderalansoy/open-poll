import Vue from 'vue';
import Router from 'vue-router';
import vSelect from 'vue-select';
import BootstrapVue from 'bootstrap-vue';
import { loadProgressBar } from 'axios-progress-bar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Index from '@/components/Index';
import Login from '@/components/Login';
import Results from '@/components/Results';

Vue.use(BootstrapVue);
Vue.component('v-select', vSelect);

loadProgressBar();
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/home',
      name: 'Index',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/results',
      name: 'Results',
      component: Results,
    },
    {
      path: '*',
      redirect: '/login',
    },
  ],
});
