function getPokemonsTemplate(index, pokemon, type1, type2) {
  return `<div onclick="toggleOverlay(${index})" class="pokemon-box">
    <div class="pokemon-header">
      <p>${pokemon.name.toUpperCase()}</p>
      <p>#${pokemon.id}</p>
    </div>
    <div class="pokemon-img">
      <img src="${pokemon.sprites.other.dream_world.front_default}" alt="" />
    </div>
    <div class="pokemon-footer" id="pokemon_footer_${index}">
      <p class="txt-shadow">${type1.toUpperCase()}</p>
      <p class="txt-shadow"></p>
    </div>
  </div>`;
}

function getPokemonsOverlayTemplate(index, pokemon, type1, type2) {
  return `<div class="overlay-pokemon-card">
        <div class="overlay-nav">
          <button id="prev_btn">＜</button>
          <button id="close_btn">X</button>
          <button id="next_btn">＞</button>
        </div>
        <div class="overlay-pokemon-header">
          <p>${pokemon.name.toUpperCase()}</p>
          <p>#${pokemon.id}</p>
        </div>
        <div class="overlay-pokemon-img">
          <img src="${pokemon.sprites.other.dream_world.front_default}" alt="" />
        </div>
        <div class="overlay-pokemon-details-tabs">
          <p>INFO</p>
          <p>STATS</p>
        </div>
        <div class="overlay-pokemon-types">
          <p>${type1}</p>
          <p>${type2}</p>
        </div>

        <div class="overlay-pokemon-infos">
          <div class="overlay-info-item">
            <p>Height</p>
            <p>${pokemon.height}</p>
          </div>

            <div class="overlay-info-item">
              <p>Weight</p>
              <p>${pokemon.weight}</p>
            </div>

            <div class="overlay-info-item">
              <p>EXP</p>
              <p>${pokemon.base_experience}</p>
            </div>
          </div>
        </div>
      </div>`;
}
