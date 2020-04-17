const router = require('express').Router()
const encodeMedium = require('../encoders/MediumEncode')
const decodeMedium = require('../encoders/MediumDecode')
const uuid = require('uuid')

router.post('/decode', async function (req, res) {

    if (!req.files && !req.body.decode) {
        return res.status(400).send('No files or text were uploaded.');
    }

    let array;
    if (req.body.mode === 'text') {
        array = req.body.decode.split('&#257;');
        if (array.length > 1) {
            array = array.slice(0, array.length - 1);
        }
        let result = [];
        for (let i = 0; i < array.length; i++) {
            function tryPushLine() {
                try {
                    result.push(decodeMedium(array[i]));
                } catch (err) {
                    tryPushLine();
                }
            }
            tryPushLine();
        }
        res.send({ result: result.join('\n'), resultCode: 200 })
        console.log('Result sended')
    } else {
        array = req.files.txt.data.toString().split('&#257;');
        if (array.length > 1) {
            array = array.slice(0, array.length - 1);
        }
        let result = [];
        for (let i = 0; i < array.length; i++) {
            function tryPushLine() {
                try {
                    result.push(decodeMedium(array[i]));
                } catch (err) {
                    tryPushLine();
                }
            }
            tryPushLine();
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

router.post('/encode', async function (req, res) {
    if (!req.files && !req.body.encode) {
        return res.status(400).send('No files or text were uploaded.');
    }

    let array;

    if (req.body.mode === 'text') {
        array = req.body.encode.split('\n')
        let result = [];
        for (let i = 0; i < array.length; i++) {
            function tryPushLine() {
                try {
                    result.push(encodeMedium(array[i]) + '&#257;');
                } catch (err) {
                    tryPushLine();
                }
            }
            tryPushLine();
        }
        res.send({ result: result.join(''), resultCode: 200 })
        console.log('Result sended')
    } else {
        array = req.files.txt.data.toString().split('\n')
        let result = [];
        for (let i = 0; i < array.length; i++) {
            function tryPushLine() {
                try {
                    result.push(encodeMedium(array[i]) + '&#257;');
                } catch (err) {
                    tryPushLine();
                }
            }
            tryPushLine();
        }
        let data = result.join('');
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