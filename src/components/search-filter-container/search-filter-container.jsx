import React from "react";
import { usePokemonStore } from "../../hooks/usePokemonStore";
import { POKEMON_TYPES } from "../../constants/pokemon-types";
import FilterInput from "../filter-input/filter-input.component";
import SearchInput from "../search-input/search-input.component";
import Grid from "@material-ui/core/Grid";
import { useObserver } from "mobx-react";

const SearchFilterContainer = () => {
  const pokemonStore = usePokemonStore();

  const typesArray = Object.keys(POKEMON_TYPES).map((i) => POKEMON_TYPES[i]);
  return useObserver(() => (
    <Grid container spacing={2} justify="center">
      <Grid item xs={10} sm={6} md={4}>
        <SearchInput
          setFilter={pokemonStore.filterPokemons}
          input={pokemonStore.filter.name}
        />
      </Grid>
      <Grid item xs={10} sm={6} md={4}>
        <FilterInput
          filterData={typesArray}
          filterPokemonsAction={pokemonStore.filterPokemons}
        />
      </Grid>
    </Grid>
  ));
};
export default SearchFilterContainer;
