import Vue from 'vue';
import App from './App.vue';
import Home from './pages/Home.vue';
import Docs from './pages/Docs.vue';
import PaletteDemo from './pages/PaletteDemo.vue';
// import MegaMenu from './components/MegaMenu';
import store from './store';
import Router from 'vue-router';
import VueCompositionApi from '@vue/composition-api';
import CanonRevealer from 'canon-revealer';

Vue.use(Router);
Vue.use(CanonRevealer);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

const routes = [
    { path: '/', component: Home},
    { path: '/palette', component: PaletteDemo},
    { path: '/documentation', component: Docs},
];
const router = new Router({
    routes,
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');