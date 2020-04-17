function encodeRailFenceCipher(string, numberRails) {
    if (!string.length) return '';

    let rails = {};
    for (let i = 0; i < numberRails; i++) rails[i] = [];


    let currentPos = 0;
    let arr = string.split('');
    let result = '';
    let change = 1;

    for (let i = 0; i < arr.length; i++) {
        rails[currentPos].push(arr[i]);
        currentPos += change;
        if (currentPos === numberRails - 1 || currentPos === 0) change = -change;
    }
    for (let i = 0; i < numberRails; i++) result += rails[i].join("");
    return result;
}

module.exports = encodeRailFenceCipher;