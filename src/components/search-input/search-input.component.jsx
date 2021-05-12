import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { searchStyles } from "./MUI-styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { usePokemonStore } from "../../hooks/usePokemonStore";
import { useObserver } from "mobx-react";

const SearchInput = ({ setFilter, input }) => {
  const pokemonStore = usePokemonStore();
  const classes = searchStyles();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (typeof input === "undefined") {
      setSearchInput("");
    } else {
      setSearchInput(input);
    }
  }, [input]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const startSearch = (event) => {
    event.preventDefault();
    if (searchInput !== "") {
      setFilter({ name: searchInput });
      pokemonStore.fetchByName();
      pokemonStore.setCurrentPage(0);
    }
  };

  const onStartSearch = (event) => {
    if (event.key === "Enter") {
      pokemonStore.clearFilter();
      setFilter({ name: searchInput });
      startSearch(event);
    }
  };

  return useObserver(() => (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search by name"
        inputProps={{ "aria-label": "search pokemons" }}
        onChange={handleSearch}
        onKeyPress={onStartSearch}
        value={searchInput}
      />
      {searchInput !== "" ? (
        <IconButton
          type="clear"
          className={classes.iconButton}
          aria-label="clear"
          onClick={(event) => {
            pokemonStore.clearFilter();
            setSearchInput("");
            event.preventDefault();
          }}
        >
          <ClearIcon />
        </IconButton>
      ) : null}
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={startSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  ));
};

SearchInput.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default SearchInput;
