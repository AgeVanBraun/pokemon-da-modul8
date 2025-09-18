'use strict';

let URL_ALLPOKEMONS = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';

let pokemonList = [];
let pokemonDetailsList = [];

function init() {
  fetchAllPokemonsData();
  console.log(pokemonList);
  console.log(pokemonDetailsList);
}

/** zieht 20 neue pokemons */
function morePokemonsBtn() {
  fetchAllPokemonsData();
}

/** zieht immer 20 pokemons von API */
async function fetchAllPokemonsData() {
  let responseAllPokemons = await fetch(URL_ALLPOKEMONS);
  let pokemonsToJson = await responseAllPokemons.json();

  let startIndex = pokemonList.length;
  pokemonList.push(...pokemonsToJson.results);

  URL_ALLPOKEMONS = pokemonsToJson.next;

  fetchPokemonDetailsData(startIndex);
}

/** zieht pokemon von API */
async function fetchPokemonDetailsData(startIndex) {
  for (let index = startIndex; index < pokemonList.length; index++) {
    let pokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
    let pokemonDetailsToJson = await pokemonDetails.json();

    pokemonDetailsList.push(pokemonDetailsToJson);
  }
  renderPokemons(startIndex);
}

/** zeigt 20 pokemons */
function renderPokemons(startIndex) {
  let contentRef = document.getElementById('pokemon_content');
  console.log(pokemonList.length);
  console.log(pokemonDetailsList.length);

  for (let index = startIndex; index < pokemonDetailsList.length; index++) {
    let type1 = pokemonDetailsList[index].types[0].type.name.toUpperCase();
    let type2 = '';
    let pokemonsTotal = document.getElementById('pokemons_total');
    pokemonsTotal.innerHTML = pokemonDetailsList.length

    if (pokemonDetailsList[index].types.length > 1) {
      type2 = pokemonDetailsList[index].types[1].type.name.toUpperCase();
    }
    contentRef.innerHTML += getPokemonsTemplate(index, type1, type2);
  }
}
