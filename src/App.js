import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import CardMovie from "./components/CardMovie/CardMovie";
import Loader from "./components/Loader/Loader";

const baseUrl = "https://api.themoviedb.org/3/"

const App = () => {
    const [items, setItems] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [key, setKey] = useState(process.env.REACT_APP_API_KEY || '');
    const [isLoaded, setIsLoaded] = useState(false);

    const getItems = (pageNr) => {
        setFetching(true);
        const url =
            `${baseUrl}discover/movie?sort_by=popularity.desc&page=${pageNr}&api_key=${key}`

        fetch(url).then(resp => resp.json())
            .then(result => {
                setTimeout(function(){
                    setIsLoaded(true);
                    setItems(result);
                }, 1500);

            });
    }

    return (
        <div className="App">
            <h1 className="App__Header">100 titlar</h1>
            <div className="App__Controls">
                <label htmlFor="input" >Api Key: </label>
                <input
                    value={key}
                    onInput={e => setKey(e.target.value)}
                    className="App__Input"
                    name="input"
                    type="text" />
                <button onClick={getItems}>Hämta filmer</button>
                {!!key &&
                [...Array(5)].map((_,i) => (
                    <button
                        onClick={(e) => getItems(i+1)}
                        className="App__PageButton"
                        key={i}>
                        {i+1}
                    </button>
                ))
                }
            </div>
            {/*<Loader />*/}
            {!!fetching && !isLoaded && <Loader />}
            {!!items?.results?.length &&
                items.results.map((item, id) => (
                    <CardMovie {...item} key={id} />
                ))
            }
            <footer>"This product uses the TMDb API but is not endorsed or certified by TMDb."</footer>
        </div>
    )
}

export default App;
