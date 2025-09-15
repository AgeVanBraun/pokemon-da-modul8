'use strict';

let id = 1;
let URL_BASE = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
let URL_Pokemon = `https://pokeapi.co/api/v2/pokemon/${id}`;
let pokemonList = [];
let pokemon = [];

function init() {
  fetchAllPokemonsData();
  fetchPokemonData();
}

/** zieht 20 neue pokemons */
function moreBtn() {
  fetchAllPokemonsData();
}

/** zieht immer 20 pokemons von API */
async function fetchAllPokemonsData() {
  let responseAllPokemons = await fetch(URL_BASE);
  let pokemonsToJson = await responseAllPokemons.json();

  console.log();

  let startIndex = pokemonList.length;
  pokemonList.push(...pokemonsToJson.results);

  URL_BASE = pokemonsToJson.next;

  console.log(pokemonList);

  renderPokemons(startIndex);
}

/** zieht pokemon von API */
async function fetchPokemonData(id) {
  let responsePokemon = await fetch(URL_Pokemon);
  let pokemonToJson = await responsePokemon.json();

  console.log(pokemonToJson);

  pokemon.push(pokemonToJson);

  console.log(pokemon);
  renderPokemons(id)
}

/** zeigt 20 pokemons */
function renderPokemons(startIndex, id) {
  let contentRef = document.getElementById('pokemon_content');

  for (let index = startIndex; index < pokemonList.length; index++) {
    contentRef.innerHTML += getPokemonsTemplate(index, pokemonList, pokemon);
  }
}
