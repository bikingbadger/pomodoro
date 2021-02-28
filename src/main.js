import { createApp } from 'vue';
// Prime vue components
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import 'primeflex/primeflex.css';

import App from './App.vue';
import router from './router';
import store from './store/index';
import firebase from './utilities/firebase';

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(router);
    app.use(store);
    app.use(firebase);
    app.use(PrimeVue, { ripple: true });
    app.component('PrimeButton', Button);
    app.mount('#app');
  }
});
