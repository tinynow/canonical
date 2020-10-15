import Vue from 'vue';
import App from './App.vue';
import Home from './pages/Home.vue';
import Docs from './pages/Docs.vue';
import PaletteDemo from './pages/PaletteDemo.vue';
import KitchenSink from './pages/KitchenSink.vue';
import Playlists from './pages/Playlists.vue';
// import MegaMenu from './components/MegaMenu';
import store from './store';
import Router from 'vue-router';
import CanonRevealer from 'canon-revealer';

Vue.use(Router);
Vue.use(CanonRevealer);
Vue.config.productionTip = false;

const routes = [
    { path: '/', component: Home},
    { path: '/palette', component: PaletteDemo},
    { path: '/documentation', component: Docs},
    { path: '/kitchen-sink', component: KitchenSink},
    { path: '/playlists', component: Playlists },
];
const router = new Router({
    mode: 'history',
    routes,
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');