const isHex = str => str.startsWith('#');
const isRgba = str => str.startsWith('rgba');
const isHsla = str => str.startsWith('hsla');
const isRgb = str => !isRgba(str) && str.startsWith('rgb');
const isHsl = str => !isHsla(str) && str.startsWith('hsl');

export {
    isHex,
    isRgba,
    isHsla,
    isRgb,
    isHsl,
};