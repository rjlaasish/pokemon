import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { usePokemonStore } from "../../hooks/usePokemonStore";
import CardPreview from "../card-preview/card-preview.component";
import Button from "@material-ui/core/Button";

const PokeInfo = ({ pokeId, data }) => {
  const pokemonStore = usePokemonStore();
  const pokemon = pokemonStore.getSelectedPokemon(data, pokeId);

  if (pokemon.length) {
    return (
      <section className="info-page-container">
        <div className="info-page-content">
          <h2>Info Page</h2>
          <div className="poke-info">
            <CardPreview pokemon={pokemon[0]} additionalInfo={true} />
          </div>

          <Link to="./">
            <Button color="primary" variant="outlined">
              Back
            </Button>
          </Link>
        </div>
      </section>
    );
  } else {
    return <div>Something went wrong</div>;
  }
};

PokeInfo.propTypes = {
  pokeId: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default PokeInfo;
