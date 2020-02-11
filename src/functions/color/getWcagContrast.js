// function from https://stackoverflow.com/a/9733420/3695983                     
const rgbLuminance = (r, g, b) => {
    const a = [r, g, b].map((val) => {
        val = val / 255;
        return val <= 0.03928
            ? val / 12.92
            : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export default (rgb1, rgb2) => {
    const l1 = (rgbLuminance(rgb1.r, rgb1.g, rgb2.b) + 0.05);
    const l2 = (rgbLuminance(rgb2.r, rgb2.g, rgb2.b) + 0.05);
    return l1 > l2 ? l2/l1 : l1/l2;
};