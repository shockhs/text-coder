import React, { useEffect, useState } from 'react'

const MediumLevelDecode = () => {
    const ENDPOINT = 'https://text-coder-app.herokuapp.com/';
    const [decode, setDecode] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify({ decode: decode, mode: 'text' })
        };
        const fetchTodo = async () => {
            await fetch(`${ENDPOINT}medium/decode`, options)
                .then(res => res.json())
                .then(res => {
                    if (res.resultCode === 200) { setError(''); setResult(res.result) }
                    else { setError(res.error) }
                })
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
                <form autoComplete="off" action='https://text-coder-app.herokuapp.com/medium/decode' method='post' encType="multipart/form-data">
                    <textarea value={decode} name="decode" id="decode" cols="60" rows="5"
                        onChange={(event) => { setDecode(event.currentTarget.value) }}></textarea>
                    <div className="simpleEncode__fileInput-text" style={{ marginTop: 13 + 'px' }}>
                        <button onClick={event => handleTextDecode(event)}>upload text</button>
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
                            <label htmlFor="submit">
                                upload
                            </label>
                            <input id="submit" type='submit' />
                            <div className="simpleEncode__fileInput-file-description">
                                <p>Choose the file with format .txt</p>
                            </div>
                        </div>

                        <p className="simpleEncode__fileInput-file-warning">Click UPLOAD again, if download didn`t start in 10 seconds</p>
                    </div>
                </form>
            </div>
            <div className="simpleEncode__result">
                {result !== '' && error === '' ? <textarea id="encode" cols="60" rows="5" value={result}></textarea> : null}
                {error === '' ? null : error}
            </div>
        </div>
    );
}

export default MediumLevelDecode