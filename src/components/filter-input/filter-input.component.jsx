import PropTypes from "prop-types";
import React, { useState } from "react";
import { usePokemonStore } from "../../hooks/usePokemonStore";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { filterStyles } from "./MUI-styles";

const FilterInput = ({ filterData, filterPokemonsAction }) => {
  const classes = filterStyles();
  const [values, setValues] = useState([]); // ['poison', 'fire']
  const pokemonStore = usePokemonStore();

  const setSelectedValues = (event, value) => {
    if (value.length > 0) {
      const newValue = value[value.length - 1].name;
      setValues([...values, newValue]);
      pokemonStore.clearFilter();
      filterPokemonsAction({ types: [newValue] });
      pokemonStore.fetchByType();
    } else {
      setValues([]);
      pokemonStore.clearFilter();
    }
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={filterData}
        getOptionLabel={(option) => option.name}
        onChange={setSelectedValues}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Filter by Type"
          />
        )}
      />
    </div>
  );
};

FilterInput.propTypes = {
  filterData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  filterPokemonsAction: PropTypes.func.isRequired,
};

export default FilterInput;
