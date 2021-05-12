import React, { useEffect } from "react";
import ErrorSnackbar from "../snackbars/error-snackbar.component";
import { usePokemonStore } from "../../hooks/usePokemonStore";
import { useObserver } from "mobx-react";

const ErrorContainer = () => {
  const pokemonStore = usePokemonStore();

  useEffect(() => {}, [pokemonStore.filterError]);
  return useObserver(() => (
    <>
      <ErrorSnackbar
        isError={pokemonStore.filterError}
        message={"No pokemon with this name"}
        errorAction={pokemonStore.setFilterError}
      />
    </>
  ));
};

export default ErrorContainer;
