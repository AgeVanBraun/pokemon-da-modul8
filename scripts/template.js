function getPokemonsTemplate(index, pokemonList, pokemon) {
  return  `<div class="pokemon-box">
            <div class="pokemon-header">
             <p>${pokemonList[index].name}</p>
             <p>#${[index + 1]}</p>
             </div>
            <div class="pokemon-img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg" alt="">
            </div>
             <div class="pokemon-footer">
            <p>${pokemon}</p>
            <p>POISON</p>
            </div>
            </div>`;
}
