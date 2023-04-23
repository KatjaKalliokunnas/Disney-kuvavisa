<script>
  import Button from './Button.svelte';
  import ScoreCounter from './ScoreCounter.svelte';
  import timer from './timer';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let charactersWithFilm = [];
  $: timesOut = $timer;

  let questionValue = true;
  let threeCharacters = [];
  let char;
  let charImage;
  let answerOption;
  let question = '';
  console.log(charactersWithFilm);

  //valitsee kysymyksen boolean arvon perusteella ja tallentaa
  //painikkeessa näytettävän teksin sen peruteella kysytäänkö
  //elokuvan vai hahmon nimeä
  function chooceQuestion() {
    let drawBoolean = Math.floor(Math.random() * 2);
    let randomNumber = Math.floor(Math.random() * threeCharacters.length);
    char = threeCharacters[randomNumber];
    charImage = char.image;

    if (drawBoolean < 0.5) {
      questionValue = false;
      question = 'Mikä on kuvassa olevan hahmon nimi?';
      answerOption = char.name;
    } else {
      questionValue = true;
      question = 'Mistä elokuvasta kuvassa oleva hahmo on tuttu?';
      answerOption = char.films;
    }
  }
  // Valitsee uudet kolme hahmoa seuraavaan kysymykseen
  function drawNewCharacters() {
    for (let i = 0; i < 3; i++) {
      let randomNumber = Math.floor(Math.random() * charactersWithFilm.length);
      threeCharacters.splice(i, i, {
        id: i,
        name: charactersWithFilm[randomNumber].name,
        films: charactersWithFilm[randomNumber].films[0],
        image: charactersWithFilm[randomNumber].image,
      });
    }
    threeCharacters = threeCharacters;
    console.log(threeCharacters);
    chooceQuestion();
  }
  drawNewCharacters();
  $: score = 0;
  let isTrue;
  function countScores(chars) {
    if (chars.id === char.id) {
      score = score + 2;
      isTrue = true;
    } else {
      score = score - 1;
      isTrue = false;
    }
    drawNewCharacters();
  }
  $: {
    if (timesOut < 0) {
      console.log('Aika loppuu');
      dispatch('quitgame');
    }
  }
</script>

<p>{question}</p>
<img src={charImage} alt="" />
<p>{answerOption}</p>
{timesOut}

{#each threeCharacters as chars, i (chars)}
  {#if questionValue}
    <div>
      <Button on:click={countScores(chars)}>{chars.films}</Button>
    </div>
  {:else}
    <div>
      <Button on:click={countScores(chars)}>{chars.name}</Button>
    </div>
  {/if}
{/each}
<ScoreCounter {score} />
<!-- <Button on:click={drawNewCharacters}>Näytä</Button> -->
<Button on:click={() => dispatch('start')}>Lopeta peli</Button>
