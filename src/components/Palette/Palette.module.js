import convertToRgb from '../../utils/color/convertToRgb';
import getWcagContrast from '../../utils/color/getWcagContrast';
import colors from '../../styles/00_settings/bird-lover-theme.scss';

const colorTool = {
    namespaced: true,
    state: {
        colors: colors,
        conformanceLevel: 'AAA',
        showContrasts: false,
    },
    getters: {
        colorMatrix(state) {
            const addContrasts = (swatch, index, swatches) => {
                swatch.contrasts = [];
                swatches.forEach((otherSwatch, index) => {
                    const contrast = getWcagContrast(swatch.rgb, otherSwatch.rgb);
                    swatch.contrasts.push({
                        index,
                        contrast, 
                    });
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
        TOGGLE_CONTRASTS(state) {
            state.showContrasts = !state.showContrasts;
        },
    },
    actions: {
        importColors({ commit }) {
            commit('SET_COLORS', colors);
        },
    },
}

export default colorTool;