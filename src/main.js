import Vue from 'vue';
import './styles/global.scss';
import App from './App.vue';
import Home from './pages/Home.vue';
import Docs from './pages/Docs.vue';
import PaletteDemo from './pages/PaletteDemo.vue';
import KitchenSink from './pages/KitchenSink.vue';
import SongNoteRoutes from './components/Playlist/routes';
// import MegaMenu from './components/MegaMenu';
import store from './store';
import Router from 'vue-router';
import CanonRevealer from 'canon-revealer';
import NotFound from './pages/NotFound.vue';

Vue.use(Router);
Vue.use(CanonRevealer);
Vue.config.productionTip = false;

const routes = [
    { path: '/', component: Home},
    { path: '/palette', component: PaletteDemo},
    { path: '/documentation', component: Docs},
    { path: '/kitchen-sink', component: KitchenSink},
    SongNoteRoutes,
    { path: '*', component: NotFound },
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