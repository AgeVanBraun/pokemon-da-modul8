'use strict';

let limit = 20;
let URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

function init() {
  console.log();
  fetchData();
}

/** zieht 20 neue pokemons */
function moreBtn() {
  limit += 20;

  console.log(limit);
}

/** holt daten von API */
async function fetchData() {
  let responseAllPokemons = await fetch(URL_BASE);
  let pokemonsToJson = await responseAllPokemons.json();
  let allPokemons = pokemonsToJson.results;
  console.log(pokemonsToJson);
  renderPokemons(allPokemons);
}

/** zeigt 20 pokemons */
function renderPokemons(allPokemons) {
  let contentRef = document.getElementById('pokemon_content');
  contentRef.innerHTML = '';

  for (let index = 0; index < limit; index++) {
    contentRef.innerHTML += getPokemonsTemplate(index, allPokemons);
  }
}
