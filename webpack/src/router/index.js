import Vue from 'vue';
import Router from 'vue-router';
import vSelect from 'vue-select';
import BootstrapVue from 'bootstrap-vue';
import { loadProgressBar } from 'axios-progress-bar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.component('v-select', vSelect);

loadProgressBar();

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
    },
  ],
});
