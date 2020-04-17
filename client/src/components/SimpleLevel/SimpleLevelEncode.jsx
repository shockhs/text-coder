import React, { useState, useEffect } from 'react';
import { useMemo } from 'react';


const SimpleLevelEncode = () => {
    const ENDPOINT = 'https://text-coder-app.herokuapp.com/';
    const [encode, setEncode] = useState('');
    const [level, setLevel] = useState('');
    const [result, setResult] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);
    const errorValidation = useMemo(() => (level < 2 || level > 20),[level]);
    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify({ levelCoding: level, encode: encode, mode: 'text' })
        };
        const fetchTodo = async () => {
            await fetch(`${ENDPOINT}simple/encode`, options)
                .then(res => res.json())
                .then(res => { setResult(res.result) })
        }
        if (encode.length > 0)
            fetchTodo();
        return () => {
            //
        };// eslint-disable-next-line
    }, [forceUpdate]);

    const handleTextEncode = (event) => {
        event.preventDefault();
        setForceUpdate(forceUpdate => !forceUpdate)
    }

    return (
        <div className="simpleEncode">
            <h1>Enter text for Encode</h1>
            <div className="simpleEncode__fileInput">
                <form autoComplete="off" action='https://text-coder-app.herokuapp.com/simple/encode' method='post' encType="multipart/form-data">
                    <textarea value={encode} name="encode" id="encode" cols="60" rows="5"
                        onChange={(event) => { setEncode(event.currentTarget.value) }}></textarea>
                    <div className="simpleEncode__fileInput-level">
                        <input value={level} required onChange={(event) => setLevel(event.currentTarget.value)} type="text" name="levelCoding" maxLength="2" />
                        <p className="simpleEncode__fileInput-level-description">Number of rails (from 2 to 20)</p>
                    </div>

                    <div className="simpleEncode__fileInput-text">
                        <button disabled={errorValidation} onClick={event => handleTextEncode(event)}>upload text</button>
                        <div className="simpleEncode__fileInput-text-description">
                            <p>Encode current text</p>
                        </div>
                    </div>
                    <div className="simpleEncode__fileInput-file">
                        <div className="simpleEncode__fileInput-file-inputs">
                            <label htmlFor="file-upload">
                                select
                            </label>
                            <input name="txt" id="file-upload" type="file" />
                            <button disabled={errorValidation} type="submit">upload</button>

                            <div className="simpleEncode__fileInput-file-description">
                                <p>Choose the file with format .txt</p>
                            </div>
                        </div>

                        <p className="simpleEncode__fileInput-file-warning">Click UPLOAD, if download didn`t start in 10 seconds</p>
                    </div>
                </form>
            </div>
            <div className="simpleEncode__result">
                {result === '' ? null : <h2>Result: {result}</h2>}
                {level.length > 0 && errorValidation ? <h2>Wrong Number of Rails</h2> : null }
            </div>
        </div>
    );
}

export default SimpleLevelEncode