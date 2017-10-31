import Vue from 'vue';
import Router from 'vue-router';
import vSelect from 'vue-select';
import { loadProgressBar } from 'axios-progress-bar';

import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);
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
