function getPokemonsTemplate(index, allPokemons) {
  return  `<div class="pokemon-box">
            <div class="pokemon-header">
             <p>${allPokemons[index].name}</p>
             <p>#${[index + 1]}</p>
             </div>
            <div class="pokemon-img">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg" alt="">
            </div>
             <div class="pokemon-footer">
            <p>GRASS</p>
            <p>POISON</p>
            </div>
            </div>`;
}
