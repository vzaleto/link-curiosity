import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {

    const [url, setUrl] = useState('');
    const [genetrateLink, setGentraleLink] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            new URL(url);
        } catch {
            setError('Invalid URL');
            return;
        }

        const encodedUrl = encodeURIComponent(url);
        const trackerUrl = `https://8c7b-188-163-50-254.ngrok-free.app/go?to=${encodedUrl}`;

        setGentraleLink(trackerUrl);
        // setGentraleLink('')

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}/>
                    <button type="submit">сгенерировать</button>
            </form>
            {error && <p>{error}</p>}
            {
                genetrateLink && (
                    <div>
                        <p>Скопируй эту ссылку и отправь другу:</p>
                       <input type="text" value={genetrateLink} readOnly/>
                    </div>
                )
            }
        </div>
);

}

export default App;
