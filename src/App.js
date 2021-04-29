import './App.css';
import {useState} from "react";
import Loader from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import ListMovie from "./components/ListMovie/ListMovie";
import { httpGet  }from "./utils/httpGet";

const baseUrl = "https://api.themoviedb.org/3/"

const App = () => {
    const [items, setItems] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [key, setKey] = useState(process.env.REACT_APP_API_KEY || '');
    const [isLoaded, setIsLoaded] = useState(false);

    const getItems = (pageNr) => {
        setFetching(true);
        const url =
            `${baseUrl}discover/movie?sort_by=popularity.desc&api_key=${key}`
            // `${baseUrl}discover/movie?sort_by=popularity.desc&page=${key}&api_key=${key}`

        const pageItems = httpGet(url, 1);
        console.log(pageItems)
        if (pageItems.length) {
            setIsLoaded(true);
            setItems(pageItems);
        }
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
                    name="input"
                    type="text" />
                <Button onClick={getItems} text="Hämta filmer" />
            </div>
            {!!fetching && !isLoaded && <Loader />}
            {!!items?.results?.length &&
                <ListMovie items={[...items.results]} />
            }
            <footer>"This product uses the TMDb API but is not endorsed or certified by TMDb."</footer>
        </div>
    )
}

export default App;
