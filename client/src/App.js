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
        const trackerUrl = `${window.location.origin}/go?to=${encodedUrl}`;

        setGentraleLink(trackerUrl);
      setError('')

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
                        <p>{genetrateLink}</p>
                       {/*<input type="text" value={genetrateLink} readOnly/>*/}
                    </div>
                )
            }
        </div>
);

}

export default App;
