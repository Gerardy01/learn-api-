import '../App.css'
import { useState, useEffect } from 'react';


function PokemonCard(props) {
    
    const [pokemonImg, setPokemonImg] = useState("");
    const [pokemonName, setPokemonName] = useState("");
    
    const getPokemonDetails = () => {
        fetch(props.pokemonUrl).then(resp => {
            resp.json().then(res => {
                setPokemonImg(res.sprites.front_default);
                setPokemonName(res.name);
            });
        });
    }
    
    useEffect(() => {
        getPokemonDetails();
    }, [props.pokemonUrl]);

    return(
        <li className='pokemon-list'>
            <div className='pokemon-img-holder'>
                <img className='pokemon-img' src={pokemonImg}/>
            </div>
            <h2 className='card-pokemon-name'>{pokemonName}</h2>
            
            <div className='details-btn-holder'>
                <button className='btn'>Details</button>
            </div>
        </li>
    );
}

export default PokemonCard