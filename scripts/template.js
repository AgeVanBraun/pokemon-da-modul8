function getPokemonsTemplate(index, type1, type2) {
  return  `<div class="pokemon-box">
            <div class="pokemon-header">
             <p>${pokemonList[index].name.toUpperCase()}</p>
             <p>#${[index + 1]}</p>
             </div>
            <div class="pokemon-img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg" alt="">
            </div>
             <div class="pokemon-footer">
            <p class="txt-shadow">${type1}</p>
            <p class="txt-shadow">${type2}</p>
            </div>
            </div>`;
}
