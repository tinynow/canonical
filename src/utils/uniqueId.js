let idCounter = 0;
const uniqueId = prefix => {
    const id = ++idCounter;
    return prefix ? `${prefix}${id}` : `${id}`;
}

export default uniqueId;