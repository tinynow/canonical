export default rgbString => {
    const rgbArray = rgbString.replace(
        /rgb\((.+?)\)/ig, 
        (matchedString, rgbValues) => rgbValues
    ).split(',').map(val => parseInt(val, 10));
    return { r: rgbArray[0], g: rgbArray[1], b: rgbArray[2] };
};