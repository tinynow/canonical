import Vue from 'vue';
import Vuex from 'vuex';
import colorTool from './components/Palette/Palette.module'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        colorTool,
    },
});
