import { createApp } from 'vue';
// Prime vue components
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog';
import Password from 'primevue/password';
import Panel from 'primevue/panel';

import 'primevue/resources/themes/md-light-indigo/theme.css';
// import 'primevue/resources/themes/md-dark-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
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
    app.use(ToastService);

    app.component('InputText', InputText);
    app.component('Button', Button);
    app.component('Toast', Toast);
    app.component('Dialog', Dialog);
    app.component('Password', Password);
    app.component('Panel', Panel);
    app.mount('#app');
  }
});
