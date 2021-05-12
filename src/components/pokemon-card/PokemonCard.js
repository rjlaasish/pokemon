import React from 'react';
import './style.css'
import {Link} from "react-router-dom";

const PokemonCard = ({name,id}) => {
        return (
            <div>
                <Link to={`/${id}`}>
                    <div className="card_container">
                        <img alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${name}.jpg`}/>
                        <h2>{name}</h2>
                    </div>
                </Link>
            </div>

        );
    }
;

export default PokemonCard;
