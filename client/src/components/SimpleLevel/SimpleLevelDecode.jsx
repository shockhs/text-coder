import React, { useState, useEffect } from 'react';
import { useMemo } from 'react';

const SimpleLevelDecode = () => {
    const ENDPOINT = 'https://text-coder-app.herokuapp.com/';
    const [decode, setDecode] = useState('');
    const [level, setLevel] = useState('');
    const [result, setResult] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);
    const errorValidation = useMemo(() => (level < 2 || level > 20), [level]);

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify({ levelCoding: level, decode: decode, mode: 'text' })
        };
        const fetchTodo = async () => {
            await fetch(`${ENDPOINT}simple/decode`, options)
                .then(res => res.json())
                .then(res => { setResult(res.result) })
        }
        if (decode.length > 0)
            fetchTodo();
        return () => {
            //
        };// eslint-disable-next-line
    }, [forceUpdate]);

    const handleTextDecode = (event) => {
        event.preventDefault();
        setForceUpdate(forceUpdate => !forceUpdate)
    }
    return (
        <div className="simpleEncode">
            <h1>Enter text for Decode</h1>
            <div className="simpleEncode__fileInput">
                <form autoComplete="off" action='https://text-coder-app.herokuapp.com/simple/decode' method='post' encType="multipart/form-data">
                    <textarea value={decode} name="decode" id="decode" cols="60" rows="5"
                        onChange={(event) => { setDecode(event.currentTarget.value) }}></textarea>
                    <div className="simpleEncode__fileInput-level">
                        <input value={level} required onChange={(event) => setLevel(event.currentTarget.value)} type="text" name="levelCoding" maxLength="2" />
                        <p className="simpleEncode__fileInput-level-description">Number of rails (from 0 to 20)</p>
                    </div>
                    <div className="simpleEncode__fileInput-text">
                        <button disabled={errorValidation} onClick={event => handleTextDecode(event)}>upload text</button>
                        <div className="simpleEncode__fileInput-text-description">
                            <p>Decode current text</p>
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

                        <p className="simpleEncode__fileInput-file-warning">Click UPLOAD again, if download didn`t start in 10 seconds</p>
                    </div>
                </form>
            </div>
            <div className="simpleEncode__result">
                {result === '' ? null : <h2>Result: {result}</h2>}
                {level.length > 0 && errorValidation ? <h2>Wrong Number of Rails</h2> : null}
            </div>
        </div>
    );
}

export default SimpleLevelDecode