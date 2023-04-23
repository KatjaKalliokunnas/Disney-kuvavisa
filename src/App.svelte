<script>
  import GameScreen from './GameScreen.svelte';
  import StartScreen from './StartScreen.svelte';

  export let title;

  // hakee Disneyapista tiedot, etsii hahmot jotka esiintyneet elokuvissa,
  // tallentaa tälläiset muuttujaan ja palauttaa sen muuttujan
  const getCharacters = async () => {
    const response = await fetch(
      'https://api.disneyapi.dev/character?pageSize=7438'
    );
    if (!response.ok) {
      throw new Error('Tiedonkulussa on nyt pieni katkos!');
    }
    const data = await response.json();
    let charactersWithFilm = [];
    // käy läpi promisen ja lisää charactersFilm taulukkoon sellaiset objektit
    // joiden films avaimessa on arvo
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].films.length > 0) {
        charactersWithFilm.push({
          name: data.data[i].name,
          films: data.data[i].films,
          image: data.data[i].imageUrl,
        });
      }
    }
    return charactersWithFilm;
  };

  let charactersWithFilm = getCharacters();

  // syötteen validointia
  let playerName = '';
  let isValidField = (text) => text.trim().length > 0;
  $: validName = isValidField(playerName);
  let isEmpty = false;
  let start = false;

  // Tarkastaa onko input-kentässä tekstiä ja jos on, aloittaa ja lopettaa pelin vaihtamalla start muuttujan boolean arvoa jonka mukaan näytetään joko aloitusruutu tai peliruutu. Jos kenttä on tyhjä antaa virheilmoituksen.
  function startGame() {
    if (validName) {
      start = !start;
    } else {
      isEmpty = true;
    }
    console.log(charactersWithFilm);
  }
</script>

<main>
  <h1>Hello {title}!</h1>

  {#await charactersWithFilm}
    <p>Loading ...</p>
  {:then charactersWithFilm}
    {#if !start}
      <StartScreen
        bind:playerName
        on:start={startGame}
        errorMessage="Syötä nimi aloittaaksesi pelin!"
        isValid={validName}
        {isEmpty}
      />
    {:else}
      <GameScreen {charactersWithFilm} />
    {/if}
  {:catch error}
    {error.message}
  {/await}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
