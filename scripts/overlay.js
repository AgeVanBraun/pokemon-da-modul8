function toggleOverlay(index) {
  let overlayRef = document.getElementById('overlay');

  // Wenn kein Index übergeben wurde → Overlay schließen
  if (index === undefined) {
    overlayRef.classList.add('d_none');
    overlayRef.innerHTML = '';
    return;
  }

  // Wenn der Index außerhalb des Bereichs liegt → nichts tun
  if (index < 0 || index >= pokemonDetailsList.length) {
    return;
  }

  // Pokémon-Daten holen
  let pokemon = pokemonDetailsList[index];
  let type1 = pokemon.types[0].type.name;
  let type2 = pokemon.types.length > 1 ? pokemon.types[1].type.name : 'none';

  // Overlay-Inhalt erzeugen
  overlayRef.innerHTML = getPokemonsOverlayTemplate(index, pokemon, type1, type2);
  overlayRef.classList.remove('d_none');

  // Buttons aktivieren
  let closeBtn = document.getElementById('close_btn');
  let nextBtn = document.getElementById('next_btn');
  let prevBtn = document.getElementById('prev_btn');

  closeBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // verhindert Schließen durch Klick-Event vom Overlay
    toggleOverlay();
  });

  nextBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleOverlay(index + 1);
  });

  prevBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleOverlay(index - 1);
  });

  // Klick auf den Hintergrund (nicht auf die Karte!)
  overlayRef.addEventListener('click', (event) => {
    // Prüfen, ob wirklich auf den Hintergrund (nicht auf die Karte oder Buttons) geklickt wurde
    if (event.target.id === 'overlay') {
      overlayRef.classList.add('d_none');
      overlayRef.innerHTML = '';
    }
  });

  console.log('Overlay für Pokémon:', pokemon.name, 'Index:', index);
}
