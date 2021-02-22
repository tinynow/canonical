import Vue from 'vue';
import './styles/global.scss';
import App from './App.vue';
import Router from 'vue-router';
import store from './store';
import router from './router';
import CanonRevealer from 'canon-revealer';
import netlifyIdentity from 'netlify-identity-widget';
netlifyIdentity.init();

Vue.use(Router);
Vue.use(CanonRevealer);
Vue.config.productionTip = false;
Vue.prototype.$netlifyIdentity = netlifyIdentity;
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');