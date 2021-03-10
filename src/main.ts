import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import SemanticUiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
Vue.use(SemanticUiVue);

import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
