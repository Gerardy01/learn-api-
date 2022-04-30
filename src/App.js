import './App.css';
import { useEffect, useState } from 'react';

import PokemonCard from './components/PokemonCard';

function App() {

  const [pokemonList, setPokemonList] = useState([]);
  const [loadPokemon, setLoadPokemon] = useState("https://pokeapi.co/api/v2/pokemon");

  const [theNext, setTheNext] = useState("");
  const [thePrev, setThePrev] = useState("");
  const [page, setPage] = useState(1);

  const getData = () => {
    fetch(loadPokemon).then((resp) => {
      resp.json().then(res => {
        
        setTheNext(res.next);
        setThePrev(res.previous);

        setPokemonList(res.results);
      });
    });
  }

  useEffect(() => {
    getData();
  }, [loadPokemon]);

  const next = () => {
    setLoadPokemon(theNext);
    if (theNext != null) {
      setPage(page + 1);
    }
  }

  const prev = () => {
    setLoadPokemon(thePrev);
    if (thePrev != null) {
      setPage(page - 1);
    }
  }

  async function sendUrl(theUrl) {
    const data = await theUrl;
    return data
  }

  return (
    <div className='container'>
      <h1 className='judul'>Hello, World</h1>

      <div className='main'>
        <div className='search'>
          <input className='search-input' type="text" placeholder="Pokemon's name here"/>
          <button className='btn'>Search</button>
        </div>

        <ul className='pokemon-list-holder'>
          {
            pokemonList.map(data => {
              return < PokemonCard pokemonUrl = {data.url} />
            })
          }
        </ul>

        <div className='next-prev'>
          <button className='btn' onClick={prev}>Prev</button>
          <h2>Page {page}</h2>
          <button className='btn' onClick={next}>Next</button>
        </div>

      </div>
    </div>
  );
}

export default App;
