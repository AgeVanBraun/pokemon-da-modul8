'use strict';

let URL_ALLPOKEMONS = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
let pokemonList = [];
let pokemonDetailsList = [];
let searchInput = document.getElementById('search_input');
let currentPokemon = 0;

function init() {
  fetchAllPokemonsData();
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
  let pokemonsTotal = document.getElementById('pokemons_total');

  pokemonsTotal.innerHTML = pokemonDetailsList.length;

  for (let index = startIndex; index < pokemonDetailsList.length; index++) {
    let type1 = pokemonDetailsList[index].types[0].type.name;
    let type2 = '';
    let pokemon = pokemonDetailsList[index];

    if (pokemonDetailsList[index].types.length > 1) {
      type2 = pokemonDetailsList[index].types[1].type.name;
    }
    contentRef.innerHTML += getPokemonsTemplate(index, pokemon, type1, type2);
    
    toggleOverlay(index)
    pokemonColor(index, type1);
  }
  console.groupCollapsed('Pokemons + Details');
  console.log(pokemonList);
  console.log(pokemonDetailsList);
  console.groupEnd();
}

/** ändert die bg color von pokemon-footer nach type */
function pokemonColor(index, type1) {
  let bgColor = document.getElementById(`pokemon_footer_${index}`);
  if (type1 == 'grass') {
    bgColor.style.backgroundColor = 'green';
  }
  if (type1 == 'fire') {
    bgColor.style.backgroundColor = 'red';
  }
  if (type1 == 'water') {
    bgColor.style.backgroundColor = 'rgb(51, 150, 205)';
  }
  if (type1 == 'rock') {
    bgColor.style.backgroundColor = 'rgb(219, 210, 169)';
  }
  if (type1 == 'ghost') {
    bgColor.style.backgroundColor = 'rgb(102, 68, 151)';
  }
  if (type1 == 'electric') {
    bgColor.style.backgroundColor = 'rgb(254, 202, 27)';
  }
  if (type1 == 'poison') {
    bgColor.style.backgroundColor = 'rgb(107, 191, 93)';
  }
  if (type1 == 'ground') {
    bgColor.style.backgroundColor = 'rgb(172, 127, 94)';
  }
  if (type1 == 'fairy') {
    bgColor.style.backgroundColor = 'rgb(246, 200, 221)';
  }
  if (type1 == 'psychic') {
    bgColor.style.backgroundColor = 'rgb(255, 204, 0)';
  }
  if (type1 == 'dark') {
    bgColor.style.backgroundColor = 'rgb(0, 62, 106)';
  }
  if (type1 == 'bug') {
    bgColor.style.backgroundColor = 'rgb(191, 165, 111)';
  }
}

/** sucht pokemon ab 3 buchstaben sonst alle pokemons */
function searchPokemon() {
  let contentRef = document.getElementById('pokemon_content');
  let searchValue = searchInput.value.toLowerCase();
  let inputLength = searchInput.value.length;

  if (inputLength <= 2) {
    renderPokemons(0);
    return;
  }

  let filteredList = pokemonDetailsList.filter((pokemon) => pokemon.name.includes(searchValue));
  contentRef.innerHTML = '';

  filteredList.forEach((pokemon, index) => {
    contentRef.innerHTML += getPokemonsTemplate(index, pokemon, pokemon.types[0].type.name);
    pokemonColor(index, pokemon.types[0].type.name);
  });
}
