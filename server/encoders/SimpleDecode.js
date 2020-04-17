function decodeRailFenceCipher(string, numberRails) {
    numberRails = numberRails || 3
    let rails = [];
    for (let i = 0; i < numberRails; i++) rails.push([])
    let currentPos = 0;
    let change = 1;

    string.split("").forEach(char => {
        rails[currentPos].push(char)
        currentPos += change
        if (currentPos === numberRails - 1 || currentPos === 0) change = -change
    })

    const bRails = [];
    for (let i = 0; i < numberRails; i++) bRails.push([])

    i = 0
    let str = string.split("")
    for (rail of rails) {
        for (let j = 0; j < rail.length; j++) bRails[i].push(str.shift())
        i++
    }

    currentPos = 0
    change = 1
    var result = ""
    for (var i = 0; i < string.length; i++) {
        result += bRails[currentPos].shift()
        currentPos += change

        if (currentPos === numberRails - 1 || currentPos === 0) change = -change
    }

    return result
}
module.exports = decodeRailFenceCipher;