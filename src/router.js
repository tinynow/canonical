import Router from 'vue-router';

import Home from './pages/Home.vue';
import Docs from './pages/Docs.vue';
import PaletteDemo from './pages/PaletteDemo.vue';
import KitchenSink from './pages/KitchenSink.vue';
import SongNoteRoutes from './components/Playlist/routes';
import NotFound from './pages/NotFound.vue';

const routes = [
    { path: '/', component: Home, name: 'home'},
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

router.beforeEach((to, from, next) => {
    console.log(to);
    // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    // else next()
    next();
});

export default router;