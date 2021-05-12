import {observable, action, computed, makeObservable} from 'mobx';
import {fetchAPI} from '../api';
import {isEmpty} from '../utils/isObjEmpty';

export default class PokemonStore {

    constructor() {
        makeObservable(this, {
            availablePokemonsCount: observable,
            pokemons: observable,
            pokemonsByType: observable,
            pokemonByName: observable,
            filter: observable,
            isFetching: observable,
            resultPerPage: observable,
            offset: observable,
            currentPage: observable,
            filterError: observable,

            filteredPokemons: computed,
            totalPokemonsCount: computed,
            isType: computed,

            getSelectedPokemon: action,
            fetch: action,
            fetchByName: action,
            fetchByType: action,
            filterPokemons: action,
            clearFilter: action,
            setOffset: action,
            setResultPerPage: action,
            setCurrentPage: action,
            setFilterError: action,
        })
    }


    isFetching = true;
    isSearching = false;
    pokemons = [];
    pokemonsByType = [];
    pokemonByName = [];
    availablePokemonsCount = 0;
    filter = {}; // name: 'bulbasaur', types: ['grass']
    filterError = false;
    resultPerPage = 10;
    offset = 0;
    currentPage = 0;

    get filteredPokemons() {
        if (!isEmpty(this.filter)) {
            let pokemonsArr = this.pokemons;
            if (this.filter.hasOwnProperty('types')) {
                pokemonsArr = this.pokemonsByType;
            } else if (!isEmpty(this.pokemonByName)) {
                pokemonsArr = this.pokemonByName;
            }
            return pokemonsArr;
        } else {
            return this.pokemons;
        }
    }

    get totalPokemonsCount() {
        if (this.filter.hasOwnProperty('types')) {
            return this.pokemonsByType.length;
        } else if (this.filter.hasOwnProperty('name')) {
            return this.pokemonByName.length
        } else {
            return this.availablePokemonsCount;
        }
    }

    get isType() {
        if (this.filter.hasOwnProperty('types')) {
            return true;
        } else {
            return false;
        }
    }

    getSelectedPokemon(pokemons, pokeId) {
        return pokemons.filter(pokemon => pokemon.id === pokeId)
    }

    filterPokemons = (filterToAdd) => {
        this.filter = {...this.filter, ...filterToAdd}
    }

    clearFilter = () => {
        this.filter = {};
        this.offset = 0;
        this.pokemonsByType = [];
        this.pokemonByName = [];
        this.isSearching = false;
    }

    setResultPerPage = (newResult) => {
        this.resultPerPage = newResult;
    }

    setOffset = (newOffset) => {
        this.offset = newOffset;
    }

    setCurrentPage = (page) => {
        this.currentPage = page;
    }

    setFilterError = (bool) => {
        this.filterError = bool;
    }

    fetchByName() {
        // add isSearching to handle unnecessary trigger of fetch()
        this.isSearching = true;
        fetchAPI(`https://pokeapi.co/api/v2/pokemon/${this.filter.name.toLowerCase().trim()}`).then((response) => {
            if (response.status === 404) {
                this.setFilterError(true);
            } else {
                this.isFetching = true;
                this.pokemonByName = [response];
            }
        }).finally(() => this.isFetching = false)
    }

     fetchByType () {
        this.isFetching = true;
        if (this.filter.types[0] === 'male' || this.filter.types[0] === 'female') {
            if (this.filter.types[0] === 'male') {
                fetchAPI(`https://pokeapi.co/api/v2/gender/2`).then((allPokemons) => {
                    Promise.all(allPokemons.pokemon_species_details.map(pokemon =>
                         fetchAPI(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_species.url.substr(42,pokemon.pokemon_species.url.length)}`)
                    )).then((fetchedPokemons) => {
                        this.pokemonsByType = fetchedPokemons;
                    }).finally(() => this.isFetching = false)
                })
            } else {
                fetchAPI(`https://pokeapi.co/api/v2/gender/1`).then((allPokemons) => {
                    Promise.all(allPokemons.pokemon_species_details.map(pokemon =>
                        fetchAPI(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_species.url.substr(42,pokemon.pokemon_species.url.length)}`)
                    )).then((fetchedPokemons) => {
                        this.pokemonsByType = fetchedPokemons;
                    }).finally(() => this.isFetching = false)
                })
            }
        } else{
            fetchAPI(`https://pokeapi.co/api/v2/type/${this.filter.types[0]}`).then((allPokemons) => {
                Promise.all(allPokemons.pokemon.map(pokemon =>
                    fetchAPI(pokemon.pokemon.url)
                )).then((fetchedPokemons) => {
                    console.log("fetcged",fetchedPokemons)
                    this.pokemonsByType = fetchedPokemons;
                }).finally(() => this.isFetching = false)
            })
    }
}

fetch()
{
    // check if fetchByName function was executed (handle offset changes)
    if (!this.isSearching) {
        this.isFetching = true;
        fetchAPI(`https://pokeapi.co/api/v2/pokemon?limit=${this.resultPerPage}&offset=${this.offset}`).then((allPokemons) => {
            this.availablePokemonsCount = allPokemons.count;
            Promise.all(allPokemons.results.map(pokemon => fetchAPI(pokemon.url))).then((fetchedPokemons) => {
                this.pokemons = [...this.pokemons, ...fetchedPokemons];
            }).finally(() => this.isFetching = false);
        });
    }
}
}