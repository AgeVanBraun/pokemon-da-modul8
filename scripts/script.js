'use strict';

let URL_BASE = "https://pokeapi.co/api/v2/pokemon";

function init (){
    console.log("Test");
    fetchData()

}

async function fetchData() {
  let response = await fetch(URL_BASE);
  let responseToJson = await response.json();
  console.log(responseToJson.results[0]);
}

function renderPokemonBox (){
    
}
