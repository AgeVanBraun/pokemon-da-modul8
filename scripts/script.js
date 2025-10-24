'use strict';

let URL_ALLPOKEMONS = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
const pokemonList = [];
const pokemonDetailsList = [];
const searchInput = document.getElementById('search_input');
let currentPokemon = 0;

function init() {
  fetchAllPokemonsData();
}

/** Lädt 20 neue Pokémon nach */
async function morePokemonsBtn() {
  const moreBtn = document.getElementById('more_btn');
  const originalText = moreBtn.textContent;

  moreBtn.innerHTML = `<span class="btn-spinner"></span>Loading...`;
  moreBtn.classList.add('loading');

  await fetchAllPokemonsData();

  moreBtn.classList.remove('loading');
  moreBtn.textContent = originalText;

  if (!URL_ALLPOKEMONS) {
    moreBtn.style.display = 'none';
  }
}

/** Holt immer 20 Pokémon von der API */
async function fetchAllPokemonsData() {
  try {
    const responseAllPokemons = await fetch(URL_ALLPOKEMONS);
    const pokemonsToJson = await responseAllPokemons.json();
    const startIndex = pokemonList.length;

    pokemonList.push(...pokemonsToJson.results);
    URL_ALLPOKEMONS = pokemonsToJson.next;

    await fetchPokemonDetailsData(startIndex);
  } catch (error) {
    console.error('Fehler beim Laden der Pokémon:', error);
  }
}

/** Holt Detaildaten einzelner Pokémon */
async function fetchPokemonDetailsData(startIndex) {
  for (let index = startIndex; index < pokemonList.length; index++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
      const pokemonDetailsToJson = await response.json();
      pokemonDetailsList.push(pokemonDetailsToJson);
    } catch (error) {
      console.error(`Fehler beim Laden von Pokémon #${index + 1}:`, error);
    }
  }
  renderPokemons(startIndex);
}

/** Zeigt Pokémon im Grid an */
function renderPokemons(startIndex) {
  const contentRef = document.getElementById('pokemon_content');
  const pokemonOverlayRef = document.getElementById('overlay');

  for (let index = startIndex; index < pokemonDetailsList.length; index++) {
    const pokemon = pokemonDetailsList[index];
    const type1 = pokemon.types[0].type.name;
    const type2 = pokemon.types[1]?.type.name || '';

    contentRef.innerHTML += getPokemonsTemplate(index, pokemon, type1, type2);
    pokemonColor(index, type1);
  }

  pokemonOverlayRef.innerHTML = '';
}

/** Ändert die Hintergrundfarbe des Pokémon-Footers nach Typ */
function pokemonColor(index, type1) {
  const bgColor = document.getElementById(`pokemon_footer_${index}`);
  if (!bgColor) return;

  const colors = {
    grass: 'green',
    fire: 'red',
    water: 'rgb(51, 150, 205)',
    rock: 'rgb(219, 210, 169)',
    ghost: 'rgb(102, 68, 151)',
    electric: 'rgb(254, 202, 27)',
    poison: 'rgb(107, 191, 93)',
    ground: 'rgb(172, 127, 94)',
    fairy: 'rgb(246, 200, 221)',
    psychic: 'rgb(255, 204, 0)',
    dark: 'rgb(0, 62, 106)',
    bug: 'rgb(191, 165, 111)',
  };

  bgColor.style.backgroundColor = colors[type1] || 'lightgray';
}

/** Sucht Pokémon ab 3 Buchstaben, sonst zeigt alle */
function searchPokemon() {
  const contentRef = document.getElementById('pokemon_content');
  const searchValue = searchInput.value.toLowerCase();
  const inputLength = searchInput.value.length;

  if (inputLength <= 2) {
    contentRef.innerHTML = '';
    renderPokemons(0);
    return;
  }

  const filteredList = pokemonDetailsList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchValue)
  );

  contentRef.innerHTML = '';

  filteredList.forEach((pokemon) => {
    const realIndex = pokemonDetailsList.findIndex((p) => p.id === pokemon.id);
    const type1 = pokemon.types[0].type.name;
    const type2 = pokemon.types[1]?.type.name || '';

    contentRef.innerHTML += getPokemonsTemplate(realIndex, pokemon, type1, type2);
    pokemonColor(realIndex, type1);
  });
}
