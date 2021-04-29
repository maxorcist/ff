import './App.css';
import {useState} from "react";
import Loader from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import ListMovie from "./components/ListMovie/ListMovie";
import { httpGet  }from "./utils/httpGet";

const baseUrl = "https://api.themoviedb.org/3/"

const App = () => {
    const [items, setItems] = useState([]);
    const [key, setKey] = useState(process.env.REACT_APP_API_KEY || '');
    const [fetching, setFetching] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    async function getItems() {
        setFetching(true);
        const url =
            `${baseUrl}discover/movie?sort_by=popularity.desc&api_key=${key}`
        setItems([
            await httpGet(url, 1),
            await httpGet(url, 2),
            await httpGet(url, 3),
            await httpGet(url, 4),
            await httpGet(url, 5),
        ], setIsLoaded(true));
    }

    return (
        <div className="App">
            <h1 className="App__Header">Top 100 filmtitlar</h1>

            <div className="App__Controls">
                <label htmlFor="input" >Api Key: </label>
                <input
                    value={key}
                    onInput={e => setKey(e.target.value)}
                    className="App__Input"
                    id="input"
                    type="text" />
                <Button onClick={getItems} text="Hämta filmer" />
            </div>

            {!!fetching && !isLoaded && <Loader />}

            {!!items.length && items.map((items, i) => (
                <ListMovie items={[...items]} key={i} />
            ))
            }
            <footer>"This product uses the TMDb API but is not endorsed or certified by TMDb."</footer>
        </div>
    )
}

export default App;
