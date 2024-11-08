import { createApp, reactive } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import Routes from './routes';
import Alert from './components/Alert.vue';
import SchemeToggler from './components/SchemeToggler.vue';
import App from './components/App.vue';
import VueJsonPretty from 'vue-json-pretty';
import Base from './base';

let token = document.head.querySelector("meta[name='csrf-token']");

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

window.Horizon.basePath = '/' + window.Horizon.path;

let routerBasePath = window.Horizon.basePath + '/';

if (window.Horizon.path === '' || window.Horizon.path === '/') {
    routerBasePath = '/';
    window.Horizon.basePath = '';
}

const router = createRouter({
    history: createWebHistory(routerBasePath),
    routes: Routes,
});

const app = createApp(App);

app.config.globalProperties.$http = axios.create();

app.component('vue-json-pretty', VueJsonPretty);
app.component('alert', Alert);
app.component('scheme-toggler', SchemeToggler);

app.mixin(Base);

const root = document.getElementById('horizon');

app.provide('appProps', {
    appName: root.dataset.appName,
    isDownForMaintenance: root.dataset.isDownForMaintenance,
});

const globalState = reactive({
    alert: {
        type: null,
        autoClose: 0,
        message: '',
        confirmationProceed: null,
        confirmationCancel: null,
    },
    autoLoadsNewEntries: localStorage.autoLoadsNewEntries === '1',
});

app.provide('globalState', globalState);

app.use(router).mount('#horizon');
