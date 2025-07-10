import './App.css';
import {useState, useEffect} from "react";
import axios from "axios";

function App() {

    const [url, setUrl] = useState('');
    const [genetrateLink, setGentraleLink] = useState('');
    const [error, setError] = useState('');
    const [LocalData, setLocationData] = useState([]);

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
        // const trackerUrl = `http://0.0.0.0:3001/go?to=${encodedUrl}`;

        setGentraleLink(trackerUrl);
      setError('')

    }
    useEffect(  () => {

        const fetchLogs = async () =>{
            try{
                const response = await axios.get('http://0.0.0.0:3001/log')

                    setLocationData(response.data)

            }catch (error) {
                console.error('Error in fetchLogs:', error);
            }

        }
        fetchLogs()

    }, [LocalData]);

    console.log(LocalData)

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
            <div>
                <h2>Логи</h2>
                {LocalData.length > 0 && LocalData.map((loc, index) => (
                    <div key={index}>
                        <p>Дата: {loc.timestamp}</p>
                        <p>IP: {loc.ip}</p>
                        <p>status :{loc.location.status}</p>
                        <p>City :{loc.location.city}</p>
                        <p>Lat : {loc.location.lat}</p>
                        <p>lon : {loc.location.lon}</p>
                        <p>provider : {loc.location.isp}</p>
                    </div>
                ))}
            </div>
        </div>
);

}

export default App;
