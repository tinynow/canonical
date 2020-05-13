import Vue from 'vue';
import Vuex from 'vuex';

import convertToRgb from './utils/color/convertToRgb';
import getWcagContrast from './utils/color/getWcagContrast';

// const comboStates = {
//     'AAA': {
        
//     },
// }

const colorTool = {
    namespaced: true,
    state: {
        colors: {},
        colorMatrix: [],
        conformanceLevel: 'AAA',
    },
    getters: {
        colorMatrix(state) {
            const addContrasts = swatch => {
                swatch.contrasts = [];
                swatches.forEach(otherSwatch => {
                    const contrast = getWcagContrast(swatch.rgb, otherSwatch.rgb);
                    swatch.contrasts.push(contrast);
                });
                return swatch;
            };

            return Object.entries(state.colors).map(
                ([name, value]) => ({ name, value, rgb: convertToRgb(value) })
            ).map(addContrasts);
        },
    },
    mutations: {
        SET_COLORS(state, payload) {
            state.colors = payload;
        },
    },
    actions: {
        importColors({ commit }) {
            commit('SET_COLORS', colors);
        },
    },
}

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        colorTool,
    },
});
