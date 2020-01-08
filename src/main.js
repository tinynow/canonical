import Vue from 'vue';
import App from './App.vue';
import Home from './pages/Home.vue';
import Docs from './pages/Docs.vue';
import Palette from './pages/Palette.vue';
import MegaMenu from './components/MegaMenu';
import store from './store';
import Router from 'vue-router';

Vue.use(Router);
Vue.config.productionTip = false;

const routes = [
    { path: '/', component: Home},
    {
        path: '/docs',
        component: Docs,
        children: [
            {path: 'mega-menu', component: MegaMenu},
        ],
    },
    { path: '/palette', component: Palette},
];
const router = new Router({
    routes,
});
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
