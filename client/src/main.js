import Vue from 'vue';
import VueRouter from 'vue-router';
import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import routes from './routes';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBgXgt7_49qViyPRmopYsToHHRyvDJOrqc',
    libraries: 'places,drawing,visualization',
  },
});

Vue.config.productionTip = false;
Vue.use(VueRouter);
const router = new VueRouter({ routes });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
