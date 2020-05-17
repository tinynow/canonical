import convertToRgb from '../../utils/color/convertToRgb';
import getWcagContrast from '../../utils/color/getWcagContrast';
import colors from '../../styles/00_settings/defaults.scss';
//import themeColors from '../../styles/00_settings/theme.scss';

const colorTool = {
    namespaced: true,
    state: {
        colors: colors,
        conformanceLevel: 'AAA',
        showFailures: false,
        showText: true,
        showContrastRatio: true,
        showSettings: false,
        showBadPasteError: false,
    },
    getters: {
        colorMatrix(state) {
            const addContrasts = (swatch, index, swatches) => {
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

export default colorTool;