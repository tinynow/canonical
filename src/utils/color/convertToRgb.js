import { isHex, isRgb, isHsl } from './detectSyntax';
import rgbToObject from './rgbToObject';
import hslToRgb from './hslToRgb'
import hexToRgb from './hexToRgb'

export default (color, asString = false) => {
    let rgb;
    if (isRgb(color)) {
        rgb = rgbToObject(color);
    } else if (isHex(color)) {
        rgb = hexToRgb(color);
    } else if (isHsl(color)) {
        rgb = hslToRgb(color);
    } else if (color === 'black') {
        rgb = { r: 0, g: 0, b: 0 };
    } else if (color === 'white') {
        rgb = { r: 255, g: 255, b: 255 };
    } else {
        console.error(`Color format must be rgb, hex, hsl format or the named color values "black" or "white". Value provided was ${color}`);
    }

    if (asString) {
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    }
    return rgb;
};