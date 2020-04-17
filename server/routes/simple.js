const router = require('express').Router()
const uuid = require('uuid');
const encodeSimple = require('../encoders/SimpleEncode')
const decodeSimple = require('../encoders/SimpleDecode')

router.post('/encode', function (req, res) {

    if (!req.files && !req.body.encode) {
        return res.status(400).send('No files or text were uploaded.');
    }

    let array;
    if (req.body.mode === 'text') {
        array = req.body.encode.split('\n')
        console.log(array)
        let result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(encodeSimple(array[i], req.body.levelCoding));
        }
        res.send({ result: result.join('\n'), resultCode: 200 })
        console.log('Result sended')
    }
    else {
        array = req.files.txt.data.toString().split('\n')
        let result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(encodeSimple(array[i], req.body.levelCoding));
        }
        let data = result.join('\n');
        res.writeHead(200, {
            'Content-Type': 'text/plane',
            'Content-Length': data.length,
            'Content-Disposition': `attachment; filename=result${uuid.v1()}.txt`
        });
        res.write(data, 'text');
        console.log('File sended')
    }
});

router.post('/decode', function (req, res) {

    if (!req.files && !req.body.decode) {
        return res.status(400).send('No files or text were uploaded.');
    }

    let array;
    if (req.body.mode === 'text') {
        array = req.body.decode.split('\n')
        let result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(decodeSimple(array[i], req.body.levelCoding));
        }
        res.send({ result: result.join('\n'), resultCode: 200 })
        console.log('Result sended')
    } else {
        array = req.files.txt.data.toString().split('\n')
        let result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(decodeSimple(array[i], req.body.levelCoding));
        }
        let data = result.join('\n');
        res.writeHead(200, {
            'Content-Type': 'text/plane',
            'Content-Length': data.length,
            'Content-Disposition': `attachment; filename=result${uuid.v1()}.txt`
        });
        res.write(data, 'text');
        console.log('File sended')
    }
});

module.exports = router
