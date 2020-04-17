function mainDecodeMethod(str) {
    let result = [];
    let string = str.split(';');
    let numberRails = parseInt(string.slice(string.length - 2, string.length - 1)[0].replace('&#26', ''));
    string = string.slice(0,string.length - 2).join(';');
    let decoded = decodeRailFenceCipher(string,numberRails);
    decoded = decoded.split('&#32;');
    decoded = decoded.slice(0, decoded.length - 1);
    let checkSpace = 0;
    for (let i = 0; i < decoded.length; i++) {
        let stroke = ''
        if (checkSpace > 0) {result.push(' '); checkSpace = 0};
        if (decoded[i] !== '') {
            decoded[i].replace(/&#(\d+);/g, function (match, dec) {
                stroke += String.fromCharCode(dec)
            });
            result.push(stroke);
            checkSpace  = 0;
        } else {
            checkSpace++;
        }
    }
    return result.reverse().join(' ');
}

function decodeRailFenceCipher(string,numberRails) {
    let arr = string.split(';');
    let rails = [];
    for (let i = 0; i < numberRails; i++) rails.push([])
    let currentPos = 0;
    let change = 1;
    arr.forEach(char => {
        rails[currentPos].push(char)
        currentPos += change
        if (currentPos === numberRails - 1 || currentPos === 0) change = -change
    })
    const bRails = [];
    for (let i = 0; i < numberRails; i++) bRails.push([])
    
    i = 0
    let str = string.split(';');
    str = str.slice(0, str.length)
    for (rail of rails) {
        for (let j = 0; j < rail.length; j++) bRails[i].push(str.shift())
        i++
    }

    currentPos = 0
    change = 1
    var result = ""

    for (var i = 0; i < arr.length; i++) {
        result += bRails[currentPos].shift() + ';'
        currentPos += change

        if (currentPos === numberRails - 1 || currentPos === 0) change = -change
    }
    return result
}

module.exports = mainDecodeMethod