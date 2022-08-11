import Vue from "vue";
import './plugins/fontawesome'
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import './assets/tailwind.css'
import AppButton from '@/components/AppButton.vue'

Vue.component('AppButton',AppButton)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
