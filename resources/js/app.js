import axios from 'axios';
import Vue from 'vue/dist/vue.esm.js';
import VueRouter from 'vue-router';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import Base from './base';
import Routes from './routes';
import Alert from './components/Alert.vue';
import SchemeToggler from './components/SchemeToggler.vue';

let token = document.head.querySelector("meta[name='csrf-token']");

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

Vue.use(VueRouter);

Vue.prototype.$http = axios.create();

window.Horizon.basePath = '/' + window.Horizon.path;

let routerBasePath = window.Horizon.basePath + '/';

if (window.Horizon.path === '' || window.Horizon.path === '/') {
    routerBasePath = '/';
    window.Horizon.basePath = '';
}

const router = new VueRouter({
    routes: Routes,
    mode: 'history',
    base: routerBasePath,
});

Vue.component('vue-json-pretty', VueJsonPretty);
Vue.component('alert', Alert);
Vue.component('scheme-toggler', SchemeToggler);

const app = Vue.component('app', require('./components/App.vue').default);
const root = document.getElementById('horizon');

Vue.mixin(Base);

new Vue({
    el: root,

    router,

    render: (createElement) =>
        createElement(app, {
            props: {
                appName: root.dataset.appName,
                isDownForMaintenance: root.dataset.isDownForMaintenance,
            },
        }),
    data() {
        return {
            alert: {
                type: null,
                autoClose: 0,
                message: '',
                confirmationProceed: null,
                confirmationCancel: null,
            },

            autoLoadsNewEntries: localStorage.autoLoadsNewEntries === '1',
        };
    },
}).$mount('#horizon');
