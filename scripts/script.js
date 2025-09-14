'use strict';

let URL_BASE = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
let pokemonList = [];

function init() {
  fetchData();
}

/** zieht 20 neue pokemons */
function moreBtn() {
  fetchData();
}

/** holt daten von API */
async function fetchData() {
  let responseAllPokemons = await fetch(URL_BASE);
  let pokemonsToJson = await responseAllPokemons.json();
  let startIndex = pokemonList.length;
  pokemonList.push(...pokemonsToJson.results);
  URL_BASE = pokemonsToJson.next;

  renderPokemons(startIndex);
}

/** zeigt 20 pokemons */
function renderPokemons(startIndex) {
  let contentRef = document.getElementById('pokemon_content');

  for (let index = startIndex; index < pokemonList.length; index++) {
    contentRef.innerHTML += getPokemonsTemplate(index, pokemonList);
  }
}
