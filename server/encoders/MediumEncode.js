function mainEncodeMethod(str) {
    let buf = [];
    let arr = str.split(' ');
    let numberRails = Math.floor(Math.random() * 10) - 1;
    for (let i = 0; i < arr.length; i++) {
        buf.unshift(['&#', ' '.charCodeAt(), ';'].join(''))
        for (let j = arr[i].length - 1; j >= 0; j--) {
            buf.unshift(['&#', arr[i][j].charCodeAt(), ';'].join(''));
        }
    }
    return encodeRailFenceCipher(buf.join(''), numberRails) + '&#26' + numberRails + ';';
}

function encodeRailFenceCipher(string,numberRails) {
    if (!string.length) return '';
    let rails = {};
    for (let i = 0; i < numberRails; i++) rails[i] = [];


    let currentPos = 0;
    let arr = string.split(';');
    arr = arr.slice(0, arr.length - 1)
    let result = '';
    let change = 1;

    for (let i = 0; i < arr.length; i++) {
        rails[currentPos].push(arr[i] + ';');
        currentPos += change;
        if (currentPos === numberRails - 1 || currentPos === 0) change = -change;
    }

    for (let i = 0; i < numberRails; i++) result += rails[i].join("");
    return result;
}

module.exports = mainEncodeMethod
