// adpated from https://stackoverflow.com/a/5624139/3695983
export default (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const fullHex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const rgbArray = fullRegex.exec(fullHex);

    return rgbArray ? {
        r: parseInt(rgbArray[1], 16),
        g: parseInt(rgbArray[2], 16),
        b: parseInt(rgbArray[3], 16)
    } : null;
};

