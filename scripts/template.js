function getPokemonsTemplate(index, pokemon, type1, type2) {
  return  `<div onclick="toggleOverlay(${index})" class="pokemon-box">
            <div class="pokemon-header">
             <p>${pokemon.name.toUpperCase()}</p>
             <p>#${pokemon.id}</p>
             </div>
            <div class="pokemon-img">
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="">
            </div>
             <div class="pokemon-footer" id="pokemon_footer_${index}">
            <p class="txt-shadow">${type1.toUpperCase()}</p>
            <p class="txt-shadow"></p>
            </div>
            </div>`;
}
