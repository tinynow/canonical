// function from https://stackoverflow.com/a/9733420/3695983                     

const rgbLuminance = (r, g, b) => {
    const a = [r, g, b].map((val) => {
        val /= 255;
        const l = ( val <= 0.03928) ? val / 12.92
            : Math.pow(((val + 0.055) / 1.055), 2.4);
        return l;
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export default (rgb1, rgb2) => {
    const lum1 = rgbLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = rgbLuminance(rgb2.r, rgb2.g, rgb2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);

    return ratio;
};