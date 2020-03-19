const rgbLuminance = (r, g, b) => {
    const a = [r, g, b].map((val) => {
        val /= 255;
        const l = (val <= 0.03928) ? val / 12.92
            : Math.pow(((val + 0.055) / 1.055), 2.4);
        return l;
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};



export default rgbLuminance;